import { writeFile } from "@foxkit/node-util/fs";
import { join } from "path";
import { isCol } from "../../lib/isCol";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const submittedColor = req.body.color;
  console.log({ submittedColor });

  try {
    if (isCol(submittedColor)) {
      await writeFile("savedColor.txt", submittedColor, "utf8");
      res.status(200).json({ accepted: true, color: submittedColor });
    } else {
      res.status(400).end(`Bad Request`);
    }
  } catch (e) {
    console.error(e);
    res.status(500).end(`Internal Server Error`);
  }
}

export const config = {
  unstable_includeFiles: ["savedColor.txt"]
};
