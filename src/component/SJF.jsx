import { useEffect, useState } from 'react';
import { SortProcess } from './sortProcess';
import { Table, Col } from 'reactstrap';

const SJF = ({ process_SJF }) => {
  const [totalTimePresence, setTotalTimePresenct] = useState(0);
  const [toatlTimeWait, setTotalTimeWait] = useState(0);

  useEffect(() => {
    SortProcess(process_SJF);
    const number = process_SJF.length;
    let timeCount = 0;
    let maxProcessOccurred = 0;
    let totalTime = process_SJF[0].timexh + process_SJF[0].timeth;
    const newSJF = [];
    process_SJF.forEach((p, i) => {
      newSJF.push({
        name: p.name,
        timexh: p.timexh,
        timeth: p.timeth,
      });
      if (i > 0) {
        if (p.timexh > totalTime) totalTime = p.timexh;
        totalTime += p.timeth;
      }
    });
    while (timeCount < totalTime) {
      maxProcessOccurred = 0;
      newSJF.forEach((p, i) => {
        if (p.timexh <= timeCount) {
          maxProcessOccurred = i + 1;
        }
      });
      if (maxProcessOccurred > 0) {
        let sttProcessMin = 0;
        let minTimeth = newSJF[0].timeth;
        for (let i = 1; i < maxProcessOccurred; i++) {
          if (minTimeth > newSJF[i].timeth) {
            sttProcessMin = i;
            minTimeth = newSJF[i].timeth;
          }
        }
        const add = newSJF[sttProcessMin].timeth;
        timeCount += add;
        newSJF[sttProcessMin].timeEnd = timeCount;
        newSJF[sttProcessMin].timeth += 1000;
      } else {
        timeCount++;
      }
    }
    process_SJF.forEach((p, i) => {
      p.timeEnd = newSJF[i].timeEnd;
    });

    let presence = 0;
    let wait = 0;
    process_SJF.forEach((p) => {
      presence += p.timeEnd - p.timexh;
      wait += p.timeEnd - p.timexh - p.timeth;
      p.gantt = (p.timeth / totalTime) * 100;
      p.left = ((p.timeEnd - p.timeth) / totalTime) * 100;
    });

    setTotalTimePresenct(parseFloat(presence / number).toFixed(5));
    setTotalTimeWait(parseFloat(wait / number).toFixed(5));
  }, []);
  return (
    <div className="body">
      <h1>Shortest Job First(SJF)</h1>
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
          {process_SJF.map((p, i) => {
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
        {process_SJF.map((p) => {
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

export default SJF;
