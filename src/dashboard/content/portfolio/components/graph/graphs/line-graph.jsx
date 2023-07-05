import React, { useEffect } from 'react'
import * as d3 from 'd3'

import { toUSD } from "../../../../../../../lib/helpers/to-usd";
import { formatDate } from '../../../../../../../lib/helpers/date-format';
import { splitWeeklyDateRange } from '../../../../../../../lib/helpers/split-weekly-date-range';
import { translateMenuText } from '../../../../../../../lib/helpers/translate-text';

// Just reference: https://codepen.io/meetamit/pen/rLmNQE maybe
export function LineGraph({ graphData, reversedGraphData, section, durationSelected }) {
  useEffect(() => {
    // Dynamic width for the d3 svg graph
    function handleResize() {
      const sidebarWidth = 320 // main page layout sidebar witdh
      const graphAreaWidth = document.documentElement.clientWidth - sidebarWidth
      drawGraph(graphAreaWidth, window.innerHeight / 2)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphData])

  function drawGraph(windowWidth, windowHeight) {
    // Remove existing graph
    const graph = document.getElementById(`d3_graph_${section}`)
    if(graph) { graph.innerHTML = '' }

    const graphTitle = `${translateMenuText(section)} ${durationSelected}`

    // Compute values. https://observablehq.com/@d3/line-with-tooltip
    const X = d3.map(graphData, (graphData) => graphData.date)
    const Y = d3.map(graphData, (graphData) => graphData.value)
    // const O = d3.map(graphData, d => d)

    // Calculate Margins and canvas dimensions
    const margin = {top: 20, right: 20, bottom: 20, left: 20}

    const width = (windowWidth ?? 640) - 220 // substract the padding from the parant div(graph)
    const height = windowHeight ?? 400
    // if graphData.length is over 20, set width to 20 * graphData.length
    const getOverWidth = graphData.length > 40 && windowWidth + (graphData.length * margin.left)
    const overWidth = getOverWidth ? getOverWidth : width

    // Scales
    const xScale = d3.scalePoint()
    .domain(reversedGraphData.map((d) => d.date))
    .range([margin.left, overWidth - margin.right])

    const yScale = d3.scaleLinear()
    .domain(d3.extent(graphData, (d) => d.value))
    .range([height - margin.bottom, margin.top])

    // Line
    const line = d3.line()
    .curve(d3.curveLinear)
    .x((graphData) => xScale(graphData.date))
    .y((graphData) => yScale(graphData.value))

    const parentSvg = d3.select(graph).append('svg')
    .attr('width', width)
    .attr('height', height)
    // .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('style', 'overflow: visible;')
    .style('position', 'absolute')
    .style('pointer-events', 'none')
    .style('z-index', 1)

    // Y Axis
    parentSvg.append('g')
    .call(d3.axisLeft(yScale).ticks(height / 40))
    .call(g => g.selectAll('.tick line:first-child')
      .attr('stroke-opacity', 0)
    )
    .attr('class', 'text-xxs font-light')
    // .select('.domain').remove()

    //  Chart title
    parentSvg.append('text')
    .attr('x', (width / 2))             
    .attr('y', -30)
    .attr('text-anchor', 'middle')  
    .attr('class', 'text-xl capitalize fill-gray-900 dark:fill-gray-100')
    .text(graphTitle)

    // Labels
    parentSvg.append('text')
    .attr('text-anchor', 'start')
    .attr('class', 'text-xs capitalize fill-gray-900 dark:fill-gray-400')
    .attr('transform', `translate(${margin.left - 80}, 0)`)
    .text('Profit / Loss USD')

    parentSvg.append('text')
    .attr('text-anchor', 'start') 
    .attr('class', 'text-xs capitalize fill-gray-900 dark:fill-gray-400')
    .attr('transform', `translate(${width}, ${height - (margin.bottom - 24)})`)
    .text('Timeline')

    // Set up scrollable x axis graph
    const body = d3.select(graph).append('div')
    .attr('style', `overflow-x: scroll; -webkit-overflow-scrolling: touch; max-width: ${width}px;`)

    const bodySvg = body.append('svg')
    .attr('width', overWidth)
    .attr('height', (height + (durationSelected === 'weekly' ? 140 : 70)))
    .style('display', 'block')
    .style('position', 'relative')
    .on('pointerenter pointermove', pointermoved)
    .on('pointerleave', pointerleft)
    .on('touchstart', event => event.preventDefault())

    // X Axis
    bodySvg.append('g')
    .call(d3.axisBottom(xScale).ticks(width / 40))
    .attr('transform', `translate(0, ${height})`)
    .selectAll('text')  
    .style('text-anchor', 'end')
    .attr('class', 'text-xxs font-light')
    .attr('dx', '-1em')
    .attr('dy', '-.4em')
    .attr('transform', 'rotate(-85)')

    bodySvg.append('g')
    .call(d3.axisLeft(yScale))
    .call(g => g.selectAll('.tick line').clone()
      .attr('x2', overWidth - margin.left)
      .attr('stroke-opacity', 0.1)
    )

    // Data Lines:
    bodySvg.append('path')
    .datum(graphData)
    .attr('fill', 'none')
    .attr('stroke', '#c600e5') // red #ef4444
    .attr('stroke-width', 3)
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('d', line)

    // x axis hover hightlight line
    const xHoverLine = bodySvg.append('rect')
    .attr('width', 0.5)
    .attr('height', height - margin.top - margin.bottom)
    .attr('fill', 'none')
    .attr('class', 'stroke-black dark:stroke-white')
    .attr('stroke-width', 0.4)
    .attr('stroke-opacity', 0.2)
    // .style('stroke-dasharray', ('4, 4')) // dashed line

    // Tooltip
    const tooltip = d3.select('body')
    .append('div')
    .attr('class', 'font-sans fill-white antialiased pointer-events-none absolute z-50 hidden text-white text-base font-bold')

    function pointermoved(event) {
      // Find the cloest point from string
      // https://stackoverflow.com/questions/40573630/how-can-i-implement-an-invert-function-for-a-point-scale
      function scalePointPosition() {
        const xPos = d3.pointer(event)[0]
        const domain = xScale.domain()
        const range = xScale.range()
        const rangePoints = d3.range(range[0], range[1], xScale.step())
        const yPos = domain[d3.bisect(rangePoints, xPos)]

        return X.indexOf(yPos)
      }

      const i = scalePointPosition()

      tooltip.style('display', null)
      .style('display', 'block')
      .style('left', `${event.pageX + 10}px`)
      .style('top', `${event.pageY - 10}px`)
      // .style('left', `${xScale(X[i])}px`) // TODO: try using graph specific x and y position
      // .style('top', `${yScale(Y[i])}px`)

      
      const dateRangeText = durationSelected === 'weekly' ? `${formatDate(splitWeeklyDateRange(X[i])[0])} to ${formatDate(splitWeeklyDateRange(X[i])[1])}` : `${formatDate(X[i])}`

      tooltip.selectAll('div')
      .data([graphData[i]])
      .join('div')
      .html(function (d) {
        return `<div class="font-sans font-normal text-white antialiased text-base p-4 py-2 rounded" style="font-size: 14px; background: ${Y[i] < 0 || section === 'Fees' ? '#ef4444' : '#22c55d'}">${dateRangeText}<br/> <span class="font-bold">P/L: ${toUSD(Y[i])}<span></div>`
      });
      
      xHoverLine.style('display', null)
      xHoverLine.attr('transform', `translate(${xScale(X[i])}, ${16})`)
    }

    function pointerleft() {
      tooltip.style('display', 'none')
      xHoverLine.style('display', 'none')
      bodySvg.node().value = null
      bodySvg.dispatch('input', { bubbles: true })
    }
  }

  return (
    <div id={`d3_graph_${section}`} className="mt-[14px] mb-20 p-10 pl-[120px] pt-[100px] pr-[100px] rounded shadow-md bg-white border-gray-50 dark:bg-neutral-800 dark:border-gray-700">
      {section}
    </div>
  )
}