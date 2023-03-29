import { useEffect, useState } from 'react';
import { SortProcess } from './sortProcess';
import { Table, Col } from 'reactstrap';

const RR = ({ process_RR, quantum }) => {
  const [totalTimePresence, setTotalTimePresenct] = useState(0);
  const [toatlTimeWait, setTotalTimeWait] = useState(0);
  const [reset, setReset] = useState(false);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    SortProcess(process_RR);
    const number = process_RR.length;
    const new_RR = [];
    let totalTime = process_RR[0].timexh + process_RR[0].timeth;
    process_RR.forEach((p, i) => {
      new_RR.push({
        name: p.name,
        timexh: p.timexh,
        timeth: p.timeth,
      });
      if (i > 0) {
        if (p.timexh > totalTime) totalTime = p.timexh;
        totalTime += p.timeth;
      }
    });

    const remainTimeArr = [];
    const timeLandmarkArr = [];
    const timeGantt = [];
    let timeG = process_RR[0].timexh;
    let timeCount = 0;

    process_RR.forEach((p) => {
      remainTimeArr.push(p.timeth);
      timeLandmarkArr.push(p.timexh);
      timeGantt.push([]);
    });
    timeLandmarkArr.push(totalTime);
    const quere = [];
    let index = 0;
    if (process_RR[0].timexh === 0) {
      quere.push(0);
    }
    while (timeCount <= totalTime) {
      const oldTime = timeCount;
      if (quere.length !== 0 && index <= quere.length - 1) {
        let stt = quere[index];

        if (remainTimeArr[stt] <= quantum) {
          timeCount += remainTimeArr[stt];
          new_RR[stt].timeEnd = timeCount;
          timeGantt[stt].push({
            from: timeCount - remainTimeArr[stt],
            to: timeCount,
          });
          remainTimeArr[stt] = 0;
        } else {
          remainTimeArr[stt] = remainTimeArr[stt] - quantum;
          timeCount += quantum;
          timeGantt[stt].push({
            from: timeCount - quantum,
            to: timeCount,
          });
        }
        index++;
        let check = false;
        process_RR.forEach((p, i) => {
          if (p.timexh < timeCount && p.timexh > oldTime) {
            quere.push(i);
            if (remainTimeArr[stt] !== 0) {
              quere.push(stt);
              check = true;
            }
          } else if (p.timexh === timeCount) {
            if (remainTimeArr[stt] !== 0) {
              quere.push(stt);
              check = true;
            }
            quere.push(i);
          }
        });
        if (check === false) {
          if (remainTimeArr[stt] !== 0) {
            quere.push(stt);
            check = true;
          }
        }
      } else {
        timeCount++;
        process_RR.forEach((p, i) => {
          if (p.timexh <= timeCount && p.timexh > oldTime) {
            quere.push(i);
          }
        });
      }
    }

    timeGantt.forEach((t) => {
      t.forEach((k, i) => {
        if (i === 0) {
          k.left = k.from;
        } else {
          k.left = k.from - t[i - 1].to;
        }
      });
    });
    let presence = 0;
    let wait = 0;
    process_RR.forEach((p, i) => {
      p.timeEnd = new_RR[i].timeEnd;
      presence += new_RR[i].timeEnd - new_RR[i].timexh;
      wait += new_RR[i].timeEnd - new_RR[i].timexh - new_RR[i].timeth;
      p.gantt = timeGantt[i];
    });

    setReset(true);
    setTotalTimePresenct(parseFloat(presence / number).toFixed(5));
    setTotalTimeWait(parseFloat(wait / number).toFixed(5));
    setTotal(totalTime);
  }, []);
  const gantt = (g) => {
    if (!g.gantt || total === 0) {
      return <div></div>;
    } else {
      return g.gantt.map((i, k) => {
        return (
          <div
            style={{
              width: `${((i.to - i.from) / total) * 100}%`,
              marginLeft: `${(i.left / total) * 100}%`,
              border: '1px black solid',
            }}
            className="color"
            key={k}
          >
            {i.to - i.from}
          </div>
        );
      });
    }
  };
  if (!reset) {
    return <div></div>;
  }
  return (
    <div className="body">
      <h1>Round Robin</h1>
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
          {process_RR.map((p, i) => {
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
        {process_RR.map((p) => {
          return (
            <div row="true" key={p.name}>
              <Col sm={1}>
                <p>{p.name}</p>
              </Col>
              <Col sm={11}>
                <div className="boder_SRT">{gantt(p)}</div>
              </Col>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RR;
