"use client";

import { CSSProperties, useState } from "react";

const style: CSSProperties = {
  display: "grid",
  placeContent: "center",
  width: "100vw",
  height: "100vh",
  position: "fixed",
  top: 0,
  left: 0,
  background: "rgba(0,0,0,0.5)",
};

const objectStyle: CSSProperties = {
  width: "80vw",
  height: "80vh",
};

export default function Page() {
  const [preview, setPreview] = useState(false);

  return (
    <div>
      <h1>PDF</h1>
      <button onClick={() => setPreview(true)}>Preview</button>
      {preview && (
        <section style={style} onClick={() => setPreview(false)}>
          <object
            onClick={(e) => e.stopPropagation()}
            data="/api/generate-pdf"
            type="application/pdf"
            style={objectStyle}
          >
            <p>
              Unable to display PDF file.{" "}
              <a href="/uploads/media/default/0001/01/540cb75550adf33f281f29132dddd14fded85bfc.pdf">
                Download
              </a>{" "}
              instead.
            </p>
          </object>
        </section>
      )}
    </div>
  );
}
