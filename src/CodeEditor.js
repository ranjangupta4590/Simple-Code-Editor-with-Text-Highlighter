import React, { useState, useRef } from "react";
import { Highlight, themes } from "prism-react-renderer";
import "./CodeEditor.css";

const testcode = `import React from "react";
import ReactDOM from "react-dom";

function App() {
  return (
    <h1>Hello world</h1>
    <div>I am Ranjan Kumar</div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
`;

const CodeEditor = () => {
  const [code, setCode] = useState(testcode);
  const editorRef = useRef(null);

  const handleChange = (event) => {
    setCode(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      const { selectionStart, selectionEnd } = event.target;
      const newCode =
        code.substring(0, selectionStart) +
        "  " + // Two spaces for tab
        code.substring(selectionEnd);

      setCode(newCode);
      // Adjust cursor position after tab insertion
      event.target.selectionStart = event.target.selectionEnd = selectionStart + 2;
    }
  };

  const handleScroll = () => {
    if (editorRef.current) {
      const { scrollTop } = editorRef.current;
      if (editorRef.current.nextSibling) {
        editorRef.current.nextSibling.scrollTop = scrollTop;
      }
    }
  };

  return (
    <div className="code-editor">
      <div>
        <textarea
          value={code}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          spellCheck="false"
          className="code-input"
          ref={editorRef}
        />
      </div>
      <div className="code-output">
        <Highlight theme={themes.shadesOfPurple} code={code} language="jsx">
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  <span className="line-number">{i + 1}</span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
};

export default CodeEditor;
