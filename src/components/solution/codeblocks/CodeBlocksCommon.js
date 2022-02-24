import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript';
import {docco} from 'react-syntax-highlighter/dist/cjs/styles/hljs'; 

SyntaxHighlighter.registerLanguage('javascript', js);

const HIGHLIGHT_COLOUR = '#BEF264';
const PRE_STYLE = {display: "flex"}

function buildSyntaxHighlight(code, inSolution, inLines, outLines) {
  return (
    <SyntaxHighlighter 
      language="javascript" 
      style={docco}
      customStyle={PRE_STYLE}
      showLineNumbers={true}
      wrapLines={true}
      lineProps={lineNumber => {
                let style = { display: 'block' };
                if (inSolution && inLines.includes(lineNumber)) {
                  style.backgroundColor = HIGHLIGHT_COLOUR
                }else if (!inSolution && outLines.includes(lineNumber)) {
                  style.backgroundColor = HIGHLIGHT_COLOUR
                }
      
                return { style };
              }}
    >
      {code}
    </SyntaxHighlighter>
  )
}

export {buildSyntaxHighlight}