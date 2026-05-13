(function () {
  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderInline(text) {
    let out = escapeHtml(text);
    out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
    out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    return out;
  }

  function closeList(state, parts) {
    if (state.listType) {
      parts.push(state.listType === 'ol' ? '</ol>' : '</ul>');
      state.listType = null;
    }
  }

  function closeTable(state, parts) {
    if (state.inTable) {
      parts.push('</tbody></table>');
      state.inTable = false;
      state.tableHeaderDone = false;
    }
  }

  function flushParagraph(state, parts) {
    if (state.paragraph.length) {
      parts.push('<p>' + renderInline(state.paragraph.join(' ')) + '</p>');
      state.paragraph = [];
    }
  }

  function parseTableRow(line) {
    return line
      .trim()
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map(function (cell) { return cell.trim(); });
  }

  function renderMarkdown(markdown) {
    const lines = String(markdown).replace(/\r\n/g, '\n').split('\n');
    const parts = [];
    const state = {
      listType: null,
      paragraph: [],
      inCode: false,
      inTable: false,
      tableHeaderDone: false
    };

    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      const trimmed = line.trim();
      const next = i + 1 < lines.length ? lines[i + 1].trim() : '';

      if (trimmed.startsWith('```')) {
        flushParagraph(state, parts);
        closeList(state, parts);
        closeTable(state, parts);
        if (state.inCode) {
          parts.push('</code></pre>');
          state.inCode = false;
        } else {
          parts.push('<pre><code>');
          state.inCode = true;
        }
        continue;
      }

      if (state.inCode) {
        parts.push(escapeHtml(line) + '\n');
        continue;
      }

      if (!trimmed) {
        flushParagraph(state, parts);
        closeList(state, parts);
        closeTable(state, parts);
        continue;
      }

      if (/^\|.*\|$/.test(trimmed) && /^\|?(\s*:?-+:?\s*\|)+\s*:?-+:?\s*\|?$/.test(next)) {
        let tableCaption = '';
        if (state.paragraph.length) {
          const lastParagraphLine = String(state.paragraph[state.paragraph.length - 1] || '').trim();
          const captionMatch = lastParagraphLine.match(/^Table caption:\s*(.+)$/i);
          if (captionMatch) {
            tableCaption = captionMatch[1].trim();
            state.paragraph.pop();
          }
        }
        flushParagraph(state, parts);
        closeList(state, parts);
        closeTable(state, parts);
        const headers = parseTableRow(trimmed);
        parts.push('<div class="table-wrap"><table>' + (tableCaption ? ('<caption>' + renderInline(tableCaption) + '</caption>') : '') + '<thead><tr>' + headers.map(function (cell) {
          return '<th scope="col">' + renderInline(cell) + '</th>';
        }).join('') + '</tr></thead><tbody>');
        state.inTable = true;
        state.tableHeaderDone = true;
        i += 1;
        continue;
      }

      if (state.inTable && /^\|.*\|$/.test(trimmed)) {
        const cells = parseTableRow(trimmed);
        if (cells.length) {
          const firstCell = '<th scope="row">' + renderInline(cells[0]) + '</th>';
          const restCells = cells.slice(1).map(function (cell) {
            return '<td>' + renderInline(cell) + '</td>';
          }).join('');
          parts.push('<tr>' + firstCell + restCells + '</tr>');
        } else {
          parts.push('<tr></tr>');
        }
        continue;
      }

      if (/^#{1,6}\s+/.test(trimmed)) {
        flushParagraph(state, parts);
        closeList(state, parts);
        closeTable(state, parts);
        const level = trimmed.match(/^#+/)[0].length;
        const text = trimmed.replace(/^#{1,6}\s+/, '');
        parts.push('<h' + level + '>' + renderInline(text) + '</h' + level + '>');
        continue;
      }

      if (/^\d+\.\s+/.test(trimmed)) {
        flushParagraph(state, parts);
        closeTable(state, parts);
        if (state.listType !== 'ol') {
          closeList(state, parts);
          parts.push('<ol>');
          state.listType = 'ol';
        }
        parts.push('<li>' + renderInline(trimmed.replace(/^\d+\.\s+/, '')) + '</li>');
        continue;
      }

      if (/^-\s+/.test(trimmed)) {
        flushParagraph(state, parts);
        closeTable(state, parts);
        if (state.listType !== 'ul') {
          closeList(state, parts);
          parts.push('<ul>');
          state.listType = 'ul';
        }
        parts.push('<li>' + renderInline(trimmed.replace(/^-\s+/, '')) + '</li>');
        continue;
      }

      closeList(state, parts);
      closeTable(state, parts);
      state.paragraph.push(trimmed);
    }

    flushParagraph(state, parts);
    closeList(state, parts);
    closeTable(state, parts);
    if (state.inCode) parts.push('</code></pre>');
    return parts.join('\n');
  }

  async function bootstrap() {
    const target = document.querySelector('[data-markdown-source]');
    if (!target) return;
    const source = target.getAttribute('data-markdown-source');
    if (!source) return;
    try {
      const response = await fetch(source, { credentials: 'same-origin' });
      if (!response.ok) throw new Error('HTTP ' + response.status);
      const markdown = await response.text();
      target.innerHTML = renderMarkdown(markdown);
    } catch (error) {
      target.innerHTML = '<div class="warning"><strong>Guide content could not be loaded.</strong> Open <a href="' + escapeHtml(source) + '">the canonical markdown guide</a>.</div>';
    }
  }

  bootstrap();
}());
