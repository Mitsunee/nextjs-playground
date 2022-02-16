import { useState, useEffect } from "react";
import { readFile } from "@foxkit/node-util/fs";
import { join } from "path";

import { useFormattedDate } from "../lib/useFormattedDate";
import { isCol } from "../lib/isCol";
import Head from "next/head";
import ColorBox from "../lib/ColorBox";

export default function ColorPage({ current, wasDefault, builtAt }) {
  const [preview, setPreview] = useState(current);
  const [formState, setFormState] = useState(0);
  const builtAtFormatted = useFormattedDate(builtAt);
  const next = useFormattedDate(builtAt + 3e5);

  const handleSubmit = event => {
    event.preventDefault();
    fetch("/api/submit-col", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ color: preview })
    })
      .then(res => {
        console.log(res);
        if (!res.ok) throw Error("woops");
        return res.json();
      })
      .then(({ accepted, color }) => {
        console.log({ res: { accepted, color } });
        setFormState(accepted && color === preview ? 1 : -1);
      })
      .catch(() => setFormState(-1));
  };

  useEffect(() => {
    console.log({ current, wasDefault, builtAt });
  }, []);

  useEffect(() => {
    setFormState(0);
  }, [preview]);

  return (
    <>
      <style jsx global>{`
        html,
        body,
        main {
          max-width: 100%;
          width: 100%;
          min-height: 100vh;
          font-size: 20px;
        }
      `}</style>
      <style jsx>{`
        main {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          gap: 0.75em;
        }
        main > div,
        main > form {
          flex-basis: 90%;
          display: flex;
          align-items: center;
          gap: 1ch;
        }
        main > * {
          margin: 0px;
        }
      `}</style>
      <Head>
        <title>Server writeFile test</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Server writeFile test</h1>
        <div>
          <ColorBox color={current} readOnly>
            Current Color
          </ColorBox>
        </div>
        <form onSubmit={handleSubmit}>
          <ColorBox
            color={preview}
            onChange={ev => setPreview(ev.target.value)}>
            Set a new Color
          </ColorBox>
          <input type="submit" value="Set Color" />
        </form>
        <p>
          The saved color is read every 5mins. Color must be 6 digit hex code.
          The current color was read at {builtAtFormatted || "??"} and was{" "}
          {!wasDefault && "not"} the default value
        </p>
        {formState < 0 && <p style={{ color: "red" }}>Bad Input</p>}
        {formState > 0 && (
          <p>Color Submitted. Next update is at approx {next}</p>
        )}
      </main>
    </>
  );
}

export const config = {
  unstable_includeFiles: ["savedColor.txt"]
};

export async function getStaticProps() {
  let current;
  let wasDefault = false;

  current = await readFile("savedColor.txt");

  if (!current) {
    current = "#000000";
    wasDefault = true;
  }

  return {
    props: { current, wasDefault, builtAt: Date.now() },
    revalidate: 300
  };
}
