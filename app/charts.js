// Indonesia in Numbers — chart drawing.
// All charts are inline SVG built as strings: no library, no canvas, no network.
// Every chart labels its values so the figures read even in a small screenshot.

function svgOpen(width, height, title) {
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${title}" preserveAspectRatio="xMidYMid meet">` +
    `<title>${title}</title>`;
}

function formatTick(value) {
  if (Math.abs(value) >= 100) return String(Math.round(value));
  if (Math.abs(value) >= 10) return String(Math.round(value * 10) / 10);
  return String(Math.round(value * 100) / 100);
}

// Vertical bars for a series of {label, value}. Options: colour, unit suffix, highlightLast.
function barChart(series, options) {
  const width = 720, height = 300;
  const padLeft = 44, padRight = 10, padTop = 26, padBottom = 34;
  const plotW = width - padLeft - padRight, plotH = height - padTop - padBottom;
  const values = series.map(d => d.value);
  const min = Math.min(0, ...values), max = Math.max(...values);
  const span = (max - min) || 1;
  const y = v => padTop + plotH - ((v - min) / span) * plotH;
  const slot = plotW / series.length;
  const barW = Math.min(54, slot * 0.62);
  let out = svgOpen(width, height, options.title);
  // gridlines: zero line plus max line
  out += `<line x1="${padLeft}" y1="${y(0)}" x2="${width - padRight}" y2="${y(0)}" class="axis-line"/>`;
  out += `<line x1="${padLeft}" y1="${y(max)}" x2="${width - padRight}" y2="${y(max)}" class="grid-line"/>`;
  out += `<text x="${padLeft - 6}" y="${y(max) + 4}" class="tick" text-anchor="end">${formatTick(max)}${options.unit || ''}</text>`;
  out += `<text x="${padLeft - 6}" y="${y(0) + 4}" class="tick" text-anchor="end">0</text>`;
  series.forEach((d, i) => {
    const cx = padLeft + slot * i + slot / 2;
    const top = y(Math.max(d.value, 0)), bottom = y(Math.min(d.value, 0));
    const fill = options.highlightLast && i === series.length - 1 ? options.highlight : (d.value < 0 ? '#c0392b' : options.colour);
    out += `<rect x="${(cx - barW / 2).toFixed(1)}" y="${top.toFixed(1)}" width="${barW}" height="${Math.max(1, bottom - top).toFixed(1)}" fill="${fill}" rx="2"/>`;
    // A negative bar's label sits just above the zero line, clear of the year ticks below.
    const labelY = d.value < 0 ? y(0) - 6 : top - 6;
    out += `<text x="${cx.toFixed(1)}" y="${labelY.toFixed(1)}" class="bar-value" text-anchor="middle">${formatTick(d.value)}</text>`;
    out += `<text x="${cx.toFixed(1)}" y="${height - 12}" class="tick" text-anchor="middle">${d.label}</text>`;
  });
  return out + '</svg>';
}

// Line with dots and end labels for a series of {label, value}.
function lineChart(series, options) {
  const width = 720, height = 300;
  const padLeft = 44, padRight = 16, padTop = 26, padBottom = 34;
  const plotW = width - padLeft - padRight, plotH = height - padTop - padBottom;
  const values = series.map(d => d.value);
  let min = Math.min(...values), max = Math.max(...values);
  if (options.includeZero) min = Math.min(0, min);
  const pad = (max - min) * 0.12 || 1;
  min -= pad; max += pad;
  const x = i => padLeft + (plotW * i) / (series.length - 1);
  const y = v => padTop + plotH - ((v - min) / (max - min)) * plotH;
  let out = svgOpen(width, height, options.title);
  if (min < 0 && max > 0) out += `<line x1="${padLeft}" y1="${y(0).toFixed(1)}" x2="${width - padRight}" y2="${y(0).toFixed(1)}" class="axis-line"/>`;
  out += `<line x1="${padLeft}" y1="${y(max - pad).toFixed(1)}" x2="${width - padRight}" y2="${y(max - pad).toFixed(1)}" class="grid-line"/>`;
  // The top tick repeats the highest point's own label when a labelled point sits near the
  // top line; draw it only when no labelled point is close enough to speak for the scale.
  const labelledNearTop = series.some((d, i) =>
    (i === 0 || i === series.length - 1 || (options.labelEvery && i % options.labelEvery === 0)) &&
    Math.abs(y(d.value) - y(max - pad)) < 16);
  if (!labelledNearTop) {
    out += `<text x="${padLeft - 6}" y="${(y(max - pad) + 4).toFixed(1)}" class="tick" text-anchor="end">${formatTick(max - pad)}${options.unit || ''}</text>`;
  }
  const points = series.map((d, i) => `${x(i).toFixed(1)},${y(d.value).toFixed(1)}`).join(' ');
  out += `<polyline points="${points}" fill="none" stroke="${options.colour}" stroke-width="2.5" stroke-linejoin="round"/>`;
  series.forEach((d, i) => {
    const showLabel = i === 0 || i === series.length - 1 || (options.labelEvery && i % options.labelEvery === 0);
    out += `<circle cx="${x(i).toFixed(1)}" cy="${y(d.value).toFixed(1)}" r="3.2" fill="${options.colour}"/>`;
    if (showLabel) {
      // A point near the top would collide with the axis tick label: put its value under the point instead.
      let labelY = y(d.value) - 9;
      if (labelY < padTop + 8) labelY = y(d.value) + 17;
      out += `<text x="${x(i).toFixed(1)}" y="${labelY.toFixed(1)}" class="bar-value" text-anchor="middle">${formatTick(d.value)}</text>`;
    }
    if (i === 0 || i === series.length - 1 || (options.labelEvery && i % options.labelEvery === 0)) {
      out += `<text x="${x(i).toFixed(1)}" y="${height - 12}" class="tick" text-anchor="middle">${d.label}</text>`;
    }
  });
  return out + '</svg>';
}

// Horizontal bars for ranked categories, e.g. provinces by population.
function rankBars(series, options) {
  const rowH = 26, width = 720, height = series.length * rowH + 12;
  const labelW = 168, valueW = 86;
  const plotW = width - labelW - valueW;
  const max = Math.max(...series.map(d => d.value));
  let out = svgOpen(width, height, options.title);
  series.forEach((d, i) => {
    const top = 6 + i * rowH;
    const w = Math.max(2, (d.value / max) * plotW);
    out += `<text x="${labelW - 8}" y="${top + 15}" class="rank-label" text-anchor="end">${d.label}</text>`;
    out += `<rect x="${labelW}" y="${top + 3}" width="${w.toFixed(1)}" height="15" fill="${options.colour}" rx="2"/>`;
    out += `<text x="${(labelW + w + 7).toFixed(1)}" y="${top + 15}" class="bar-value">${d.display}</text>`;
  });
  return out + '</svg>';
}

// Donut for shares that sum to 100, with a legend drawn beside it.
function donutChart(parts, options) {
  const size = 240, cx = 120, cy = 120, rOuter = 104, rInner = 62;
  let out = svgOpen(560, size, options.title);
  let angle = -Math.PI / 2;
  const point = (r, a) => `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  parts.forEach(part => {
    const sweep = (part.pct / 100) * Math.PI * 2;
    const a0 = angle, a1 = angle + sweep;
    const large = sweep > Math.PI ? 1 : 0;
    out += `<path d="M ${point(rOuter, a0)} A ${rOuter} ${rOuter} 0 ${large} 1 ${point(rOuter, a1)} ` +
      `L ${point(rInner, a1)} A ${rInner} ${rInner} 0 ${large} 0 ${point(rInner, a0)} Z" fill="${part.colour}"/>`;
    angle = a1;
  });
  out += `<text x="${cx}" y="${cy - 4}" class="donut-centre" text-anchor="middle">${options.centreTop}</text>`;
  out += `<text x="${cx}" y="${cy + 17}" class="donut-centre-sub" text-anchor="middle">${options.centreSub}</text>`;
  parts.forEach((part, i) => {
    const ly = 44 + i * 44;
    out += `<rect x="268" y="${ly - 13}" width="14" height="14" fill="${part.colour}" rx="2"/>`;
    out += `<text x="292" y="${ly}" class="legend-label">${part.label || part.group || part.sector}</text>`;
    out += `<text x="292" y="${ly + 19}" class="legend-value">${part.pct}%</text>`;
  });
  return out + '</svg>';
}
