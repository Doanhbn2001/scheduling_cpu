import { Col, Table } from 'reactstrap';
import { useEffect, useState } from 'react';
import { SortProcess } from './sortProcess';

const FCFS = ({ process_FCFS }) => {
  const [totalTimePresence, setTotalTimePresenct] = useState(0);
  const [toatlTimeWait, setTotalTimeWait] = useState(0);

  useEffect(() => {
    SortProcess(process_FCFS);
    const number = process_FCFS.length;
    let temp;
    let stt = process_FCFS[0].timexh;
    process_FCFS[0].timeEnd = stt + process_FCFS[0].timeth;
    stt = process_FCFS[0].timeEnd;
    for (let i = 1; i < number; i++) {
      temp = process_FCFS[i].timexh;
      if (temp > stt) stt = temp;
      process_FCFS[i].timeEnd = stt + process_FCFS[i].timeth;
      stt = process_FCFS[i].timeEnd;
    }
    let presence = 0;
    let wait = 0;
    let th = process_FCFS[number - 1].timeEnd;
    process_FCFS.forEach((p) => {
      presence += p.timeEnd - p.timexh;
      wait += p.timeEnd - p.timexh - p.timeth;
      p.gantt = (p.timeth / th) * 100;
      p.left = ((p.timeEnd - p.timeth) / th) * 100;
    });

    setTotalTimePresenct(parseFloat(presence / number).toFixed(5));
    setTotalTimeWait(parseFloat(wait / number).toFixed(5));
  }, []);
  return (
    <div className="body">
      <h1>First Come First Served(FCFS)</h1>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên tiến trình</th>
            <th>Thời gian xuất hiện</th>
            <th>Thời gian thực hiện</th>
            <th>Thời gian kết thúc</th>
            <th>Thời gian hiện diện</th>
            <th>Thời gian đợi</th>
            <th>Thời gian hiện diện/Thời gian xử lý</th>
          </tr>
        </thead>
        <tbody>
          {process_FCFS.map((p, i) => {
            return (
              <tr key={i}>
                <th>{String(i + 1)}</th>
                <td>{String(p.name)}</td>
                <td>{String(p.timexh)}</td>
                <td>{String(p.timeth)}</td>
                <td>{String(p.timeEnd)}</td>
                <td>{String(p.timeEnd - p.timexh)}</td>
                <td>{String(p.timeEnd - p.timexh - p.timeth)}</td>
                <td>
                  {String(
                    parseFloat((p.timeEnd - p.timexh) / p.timeth).toFixed(5)
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="display_average">
        <p>
          Thời gian hiện diện trung bình của các tiến trình: {totalTimePresence}
        </p>
        <p>Thời gian chờ trung bình của các tiến trình: {toatlTimeWait}</p>
      </div>
      <div className="display_gantt">
        <h1>Sơ đồ Gantt</h1>
        {process_FCFS.map((p) => {
          return (
            <div row="true" key={p.name}>
              <Col sm={1}>
                <p>{p.name}</p>
              </Col>
              <Col sm={11} className="boder">
                {/* <div style={{ 'margin-left': `${p.left}%` }}></div> */}
                <div
                  style={{ width: `${p.gantt}%`, marginLeft: `${p.left}%` }}
                  className="color"
                >
                  {p.timeEnd - p.timeth}-{p.timeEnd}
                </div>
              </Col>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FCFS;
