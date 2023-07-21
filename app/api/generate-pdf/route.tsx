import puppeteer, { PDFOptions, PaperFormat } from "puppeteer";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const pdfOptions: PDFOptions = {
    format: (String(url.searchParams.get("format")) as PaperFormat) ?? "A4",
    landscape: Boolean(url.searchParams.get("landscape")),
    margin: {
      top: String(url.searchParams.get("margin_top")) + "px",
      right: String(url.searchParams.get("margin_right")) + "px",
      bottom: String(url.searchParams.get("margin_bottom")) + "px",
      left: String(url.searchParams.get("margin_left")) + "px",
    },
  };

  const html = generateHTML();
  const pdfBuffer = await generatePDF(html, pdfOptions);

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

async function generatePDF(htmlString: string, options: PDFOptions) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setContent(htmlString);

  const pdfBuffer = await page.pdf({
    // landscape: true,
    displayHeaderFooter: true,
    headerTemplate: /*html*/ `
    <header style="padding: 20px 30px; text-align: center; font-size: 4rem">
      <h1 class="date"></h1>
    </header>
    `,
    footerTemplate: /*html*/ `
    <footer style="padding: 20px 30px; text-align: center; font-size: 4rem">
      <h1 class="pageNumber"></h1>
    </footer>
    `,
    ...options,
  });

  await browser.close();
  return pdfBuffer;
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
