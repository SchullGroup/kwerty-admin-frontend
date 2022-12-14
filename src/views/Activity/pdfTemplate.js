/* eslint-disable consistent-return */
const style = `<style>
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}
.container {
  width: 100%;
  box-sizing: border-box;
}
table, thead, tbody{
  border-collapse: collapse;
  width: 100%;
}

thead {
 border-bottom: 1px solid #D9D9D9;
}
h3 {
 font-size: 24px;
 text-transform: capitalize;
 font-weight: 500;
}
th {
 font-size: 14px;
 text-transform: capitalize;
 text-align: left;
 padding-right: 10px;
}
td {
  text-transform: capitalize;
  font-size: 10px;
  height: 40px;
  padding-right: 10px;
}
th,
td {
  width: 20%;
}

</style>`;

const head = `
${style}`;

export default function pdfTemplate(options) {
  const { tableHeaders, tableBodyData, title } = options;
  try {
    const header = `<tr>
     ${tableHeaders.map((item) => `<th>${item}</th>`).join('')}
     </tr>`;
    const tableBody = tableBodyData
      .map(
        (element) => `
     <tr>
      ${element
    .map(
      (val) => `
       <td>${val}</td>
       `,
    )
    .join('')}
     </tr>`,
      )
      .join('');
    const tableTemplate = `<table>
     <thead>
       ${header}
     </thead>
     <div class="line"></div>
     <tbody class="table__body">
       ${tableBody}
     </tbody>
   </table>`;
    return `
     ${head}
     <body>
      <div class="container">
       <h3>${title}</h3>
       ${tableTemplate}
      </div>
     </body>
 `;
  } catch (e) {
    console.log(e);
  }
}
