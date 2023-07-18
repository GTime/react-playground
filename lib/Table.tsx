import "./styles.css";

export function Table() {
  return (
    <table className="styled-table">
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((col, index) => {
              const content: any = row[col.key];
              return <td key={index}>{content}</td>;
            })}
          </tr>
        ))}
        <tr className="active-row">
          <td>Melissa</td>
          <td>5150</td>
        </tr>
      </tbody>
    </table>
  );
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
