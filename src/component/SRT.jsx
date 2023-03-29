import { useEffect, useState } from 'react';
import { SortProcess } from './sortProcess';
import { Table, Col } from 'reactstrap';

const SRT = ({ process_SRT }) => {
  const [totalTimePresence, setTotalTimePresenct] = useState(0);
  const [toatlTimeWait, setTotalTimeWait] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const timeGantt = [];
    let saveProcess = 0;
    SortProcess(process_SRT);
    const number = process_SRT.length;
    let timeCount = 0;
    const new_SRT = [];
    let totalTime = process_SRT[0].timexh + process_SRT[0].timeth;
    process_SRT.forEach((p, i) => {
      new_SRT.push({
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
    let saveSttTimeLandmark = 0;
    let i = 0;
    let maxProcessOccurred = 0;
    let timeG = new_SRT[0].timexh;
    process_SRT.forEach((p) => {
      remainTimeArr.push(p.timeth);
      timeLandmarkArr.push(p.timexh);
      timeGantt.push([]);
    });
    timeLandmarkArr.push(totalTime);
    while (
      timeCount <= totalTime
      // timeCount <= timeLandmarkArr[saveSttTimeLandmark]
    ) {
      maxProcessOccurred = 0;
      process_SRT.forEach((p, i) => {
        if (p.timexh <= timeCount) {
          maxProcessOccurred = i + 1;
        }
      });
      if (maxProcessOccurred > 0) {
        let sttProcessMin = 0;
        let minRemainTime = remainTimeArr[0];

        for (i = 1; i < maxProcessOccurred; i++) {
          if (minRemainTime > remainTimeArr[i]) {
            sttProcessMin = i;
            minRemainTime = remainTimeArr[i];
          }
        }
        if (saveProcess !== sttProcessMin || timeCount === totalTime) {
          timeGantt[saveProcess].push({
            from: timeG,
            to: timeCount,
          });
          saveProcess = sttProcessMin;
          timeG = timeCount;
        }
        remainTimeArr[sttProcessMin]--;
        timeCount++;
        if (remainTimeArr[sttProcessMin] === 0) {
          process_SRT[sttProcessMin].timeEnd = timeCount;
          remainTimeArr[sttProcessMin] = 1000;
        }
      } else {
        timeCount++;
      }
      // if (timeCount > timeLandmarkArr[saveSttTimeLandmark]) {
      //   // console.log(
      //   //   timeLandmarkArr[saveSttTimeLandmark],
      //   //   timeCount,
      //   //   saveProcess
      //   // );
      //   saveSttTimeLandmark++;
      // }
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
    process_SRT.forEach((p, i) => {
      presence += p.timeEnd - p.timexh;
      wait += p.timeEnd - p.timexh - p.timeth;
      p.gantt = timeGantt[i];
    });

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
            }}
            className="color"
            key={k}
          >
            {i.from}-{i.to}
            {/* {g.name} */}
          </div>
        );
      });
    }
  };
  return (
    <div className="body">
      <h1>Shortest Remain Time</h1>
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
          {process_SRT.map((p, i) => {
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
        {process_SRT.map((p) => {
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

export default SRT;
