// Minimal, dependency-free syntax highlighter for JavaScript code blocks.
// It tokenizes on comments/strings first (to avoid highlighting keywords inside them),
// then applies keyword / number / punctuation coloring on the remaining plain segments.

const KEYWORDS =
  /\b(const|let|var|function|async|await|return|if|else|for|while|new|class|extends|import|from|export|default|try|catch|finally|throw|typeof|instanceof|of|in|this|null|undefined|true|false|static|get|set|switch|case|break|continue|do|yield|void|delete)\b/g;

const TOKEN_RE =
  /(\/\/[^\n]*)|(\/\*[\s\S]*?\*\/)|('(?:[^'\\]|\\.)*')|("(?:[^"\\]|\\.)*")|(`(?:[^`\\]|\\.)*`)/g;

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function highlightPlain(segment: string) {
  let out = escapeHtml(segment);
  out = out.replace(KEYWORDS, '<span class="tok-kw">$1</span>');
  out = out.replace(
    /\b(\d+(?:\.\d+)?)\b/g,
    '<span class="tok-num">$1</span>',
  );
  out = out.replace(
    /([A-Za-z_$][\w$]*)(?=\()/g,
    '<span class="tok-fn">$1</span>',
  );
  return out;
}

export function highlightJs(code: string): string {
  let result = "";
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  TOKEN_RE.lastIndex = 0;

  while ((match = TOKEN_RE.exec(code)) !== null) {
    const plain = code.slice(lastIndex, match.index);
    result += highlightPlain(plain);

    const [full, comment, blockComment, sq, dq, tpl] = match;
    if (comment || blockComment) {
      result += `<span class="tok-comment">${escapeHtml(full)}</span>`;
    } else if (sq || dq || tpl) {
      result += `<span class="tok-str">${escapeHtml(full)}</span>`;
    }
    lastIndex = match.index + full.length;
  }
  result += highlightPlain(code.slice(lastIndex));
  return result;
}
