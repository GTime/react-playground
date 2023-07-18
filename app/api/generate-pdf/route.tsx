import puppeteer from "puppeteer";

import React from "react";
import ReactDOMServer from "react-dom/server";
import { Table } from "../../../lib/Table";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const stri = generateComponent();
  console.log({ stri });
  const pdfBuffer = await generatePDF(generateHTML());

  return new Response(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      ...(url.searchParams.has("download")
        ? { "Content-Disposition": "attachment; filename=generated.pdf" }
        : {}),
    },
  });
}

const columns = [
  { key: "name", label: "Name" },
  { key: "point", label: "Points" },
  { key: "point", label: "Points" },
  { key: "point", label: "Points" },
  { key: "point", label: "Points" },
  { key: "name", label: "Organisation" },
  { key: "name", label: "Organisation" },
  { key: "name", label: "Organisation" },
  { key: "name", label: "Organisation" },
  { key: "name", label: "Organisation" },
  { key: "name", label: "Amount" },
  { key: "name", label: "Amount" },
  { key: "name", label: "Amount" },
  { key: "name", label: "Amount" },
  { key: "name", label: "Amount" },
  { key: "name", label: "Amount" },
  { key: "name", label: "Amount" },
  { key: "name", label: "Amount" },
  { key: "name", label: "XOOO" },
];

const data = [
  { name: "Dom", point: 670300 },
  { name: "Test", point: 670300 },
  { name: "Test", point: 670300 },
  { name: "Test", point: 670300 },
  { name: "Test", point: 670300 },
  { name: "Test", point: 670300 },
  { name: "Test", point: 670300 },
  { name: "Test", point: 670300 },
  { name: "Test", point: 670300 },
  { name: "Test", point: 670300 },
  { name: "Test", point: 670300 },
  { name: "Test", point: 670300 },
  { name: "Test", point: 670300 },
  { name: "Test", point: 670300 },
  { name: "Test", point: 670300 },
  { name: "Test", point: 670300 },
  { name: "Test", point: 670300 },
];

async function generatePDF(htmlString: string) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setContent(htmlString);

  const pdfBuffer = await page.pdf({
    format: "A4",
    margin: {
      top: "20px",
      right: "20px",
      bottom: "20px",
      left: "20px",
    },
  });

  await browser.close();
  return pdfBuffer;
}

function generateComponent() {
  return ReactDOMServer.renderToString(<Table />);
}

function generateHTML() {
  return /*html*/ `
    ${style()}
    <table class="styled-table">
    <thead>
        <tr>
        ${columns.reduce(
          (acc, col) => acc + /*html*/ `<th>${col.label}</th> `,
          ""
        )}
        </tr>
    </thead>
    <tbody>
        ${data.reduce(
          (acc, row) =>
            acc +
            /*html*/ ` 
            <tr>
                ${columns.reduce((acc, col) => {
                  const content: any = row[col.key];
                  return (
                    acc +
                    /*html*/ `<td  class="styled-table__heading">${content}</td>`
                  );
                }, "")}
            </tr>
            `,
          ""
        )}
        <tr class="active-row">
        <td>Melissa</td>
        <td>5150</td>
        </tr>
    </tbody>
    </table>
    `;
}

function style() {
  return /*html*/ `
    <style>
        .styled-table {
            border-collapse: collapse;
            margin: 25px 0;
            font-size: 0.9em;
            font-family: sans-serif;
            min-width: 400px;
            max-width: 100%;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
        }

        .styled-table thead tr{
            background-color: #009879;
            color: #ffffff;
            text-align: left;
        }
        

        .styled-table th,
        .styled-table td {
            padding: 12px 15px;
        }

        .styled-table tbody tr {
            border-bottom: 1px solid #dddddd;
        }

        .styled-table tbody tr:nth-of-type(even) {
            background-color: #f3f3f3;
        }

        .styled-table tbody tr:last-of-type {
            border-bottom: 2px solid #009879;
        }

        .styled-table tbody tr.active-row {
            font-weight: bold;
            color: #009879;
        }

    </style>
    `;
}
