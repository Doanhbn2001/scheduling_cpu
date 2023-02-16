import { useEffect, useState } from 'react';
import { SortProcess } from './sortProcess';
import { Table, Col } from 'reactstrap';

const Priority = ({ process_Priority }) => {
  const [totalTimePresence, setTotalTimePresenct] = useState(0);
  const [toatlTimeWait, setTotalTimeWait] = useState(0);
  useEffect(() => {
    SortProcess(process_Priority);
    const number = process_Priority.length;
    let timeCount = 0;
    let i, j;
    let new_Priority = [];
    let totalTime = process_Priority[0].timexh + process_Priority[0].timeth;
    process_Priority.forEach((p, i) => {
      new_Priority.push({
        name: p.name,
        timexh: p.timexh,
        timeth: p.timeth,
        priority: p.priority,
      });
      if (i > 0) {
        if (p.timexh > totalTime) totalTime = p.timexh;
        totalTime += p.timeth;
      }
    });
    while (timeCount < totalTime) {
      j = 0;
      for (i = 0; i < number; i++) {
        if (new_Priority[i].timexh <= timeCount) {
          j = i + 1;
        }
      }
      if (j > 0) {
        let minPriorityProcess = 0;
        let minPriority = new_Priority[minPriorityProcess].priority;

        for (let i = 0; i < j; i++) {
          if (minPriority > new_Priority[i].priority) {
            minPriorityProcess = i;
            minPriority = new_Priority[minPriorityProcess].priority;
          } else if (minPriority === new_Priority[i].priority) {
            if (
              new_Priority[minPriorityProcess].timexh > new_Priority[i].timexh
            ) {
              minPriorityProcess = i;
              minPriority = new_Priority[i].priority;
            } else if (
              new_Priority[minPriorityProcess].timexh === new_Priority[i].timexh
            ) {
              if (
                new_Priority[minPriorityProcess].timeth > new_Priority[i].timeth
              ) {
                minPriorityProcess = i;
                minPriority = new_Priority[i].priority;
              }
            }
          }
        }
        timeCount += new_Priority[minPriorityProcess].timeth;
        new_Priority[minPriorityProcess].timeEnd = timeCount;
        new_Priority[minPriorityProcess].priority += 1000;
        new_Priority[minPriorityProcess].timexh += 1000;
      } else {
        timeCount++;
      }
    }
    process_Priority.forEach((p, i) => {
      p.timeEnd = new_Priority[i].timeEnd;
    });
    let presence = 0;
    let wait = 0;
    process_Priority.forEach((p) => {
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
      <h1>Priority</h1>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên tiến trình</th>
            <th>Độ ưu tiên</th>
            <th>Thời gian xuất hiện</th>
            <th>Thời gian thực hiện</th>
            <th>Thời gian kết thúc</th>
            <th>Thời gian hiện diện</th>
            <th>Thời gian đợi</th>
            <th>Thời gian hiện diện/Thời gian xử lý</th>
          </tr>
        </thead>
        <tbody>
          {process_Priority.map((p, i) => {
            return (
              <tr key={i}>
                <th>{String(i + 1)}</th>
                <td>{String(p.name)}</td>
                <td>{String(p.priority)}</td>
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
        {process_Priority.map((p) => {
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

export default Priority;
