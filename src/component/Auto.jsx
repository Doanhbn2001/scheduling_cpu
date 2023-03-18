import { useEffect, useState } from 'react';
import { SortProcess } from './sortProcess';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const Auto = ({ stt, txhs, txhe, tths, tthe, quantum }) => {
  const randomNum = (min, max) => {
    return Math.floor(Math.random() * Number(max - min)) + Number(min) + 1;
  };

  let w_fcfs = 0;
  let p_fcfs = 0;
  let w_sjf = 0;
  let p_sjf = 0;

  let w_srt = 0;
  let p_srt = 0;
  let w_rr = 0;
  let p_rr = 0;

  const [data, setData] = useState([]);

  const fcfs = (process) => {
    const process_FCFS = [];
    process.forEach((p) => {
      process_FCFS.push({ timexh: p.timexh, timeth: p.timeth });
    });
    let temp;
    let wait = 0;
    let presence = 0;
    let current = process_FCFS[0].timexh;
    process_FCFS[0].timeEnd = current + process_FCFS[0].timeth;
    current = process_FCFS[0].timeEnd;
    for (let i = 1; i < stt; i++) {
      temp = process[i].timexh;
      if (temp > current) current = temp;
      process_FCFS[i].timeEnd = current + process_FCFS[i].timeth;
      current = process_FCFS[i].timeEnd;
    }
    process_FCFS.forEach((p) => {
      presence += p.timeEnd - p.timexh;
      wait += p.timeEnd - p.timeth - p.timexh;
    });

    w_fcfs = parseFloat(wait / stt).toFixed(2);
    p_fcfs = parseFloat(presence / stt).toFixed(2);
  };

  const sjf = (process) => {
    const process_SJF = [];
    let totalTime = process[0].timexh + process[0].timeth;
    process.forEach((p, i) => {
      process_SJF.push({ timexh: p.timexh, timeth: p.timeth });
      if (i > 0) {
        if (p.timexh > totalTime) totalTime = p.timexh;
        totalTime += p.timeth;
      }
    });
    let maxProcessOccurred = 0;
    let timeCount = 0;

    while (timeCount < totalTime) {
      maxProcessOccurred = 0;
      process_SJF.forEach((p, i) => {
        if (p.timexh <= timeCount) {
          maxProcessOccurred = i + 1;
        }
      });
      if (maxProcessOccurred > 0) {
        let sttProcessMin = 0;
        let minTimeth = process_SJF[0].timeth;
        for (let i = 1; i < maxProcessOccurred; i++) {
          if (minTimeth > process_SJF[i].timeth) {
            sttProcessMin = i;
            minTimeth = process_SJF[i].timeth;
          }
        }
        const add = process_SJF[sttProcessMin].timeth;
        timeCount += add;
        process_SJF[sttProcessMin].timeEnd = timeCount;
        process_SJF[sttProcessMin].timeth += 1000;
      } else {
        timeCount++;
      }
    }
    process_SJF.forEach((p) => {
      p.timeth -= 1000;
    });
    let wait = 0;
    let presence = 0;
    process_SJF.forEach((p) => {
      presence += p.timeEnd - p.timexh;
      wait += p.timeEnd - p.timexh - p.timeth;
    });

    w_sjf = parseFloat(wait / stt).toFixed(2);
    p_sjf = parseFloat(presence / stt).toFixed(2);
  };

  const srt = (process) => {
    const process_SRT = [];
    let timeCount = 0;
    let totalTime = process[0].timexh + process[0].timeth;
    process.forEach((p, i) => {
      process_SRT.push({ timexh: p.timexh, timeth: p.timeth });
      if (i > 0) {
        if (p.timexh > totalTime) totalTime = p.timexh;
        totalTime += p.timeth;
      }
    });
    let saveProcess = 0;
    const remainTimeArr = [];
    let maxProcessOccurred = 0;
    process_SRT.forEach((p) => {
      remainTimeArr.push(p.timeth);
    });
    while (timeCount <= totalTime) {
      maxProcessOccurred = 0;
      process_SRT.forEach((p, i) => {
        if (p.timexh <= timeCount) {
          maxProcessOccurred = i + 1;
        }
      });
      if (maxProcessOccurred > 0) {
        let sttProcessMin = 0;
        let minRemainTime = remainTimeArr[0];
        for (let i = 1; i < maxProcessOccurred; i++) {
          if (minRemainTime > remainTimeArr[i]) {
            sttProcessMin = i;
            minRemainTime = remainTimeArr[i];
          }
        }
        if (saveProcess !== sttProcessMin || timeCount === totalTime) {
          saveProcess = sttProcessMin;
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
    }

    let wait = 0;
    let presence = 0;
    process_SRT.forEach((p) => {
      presence += p.timeEnd - p.timexh;
      wait += p.timeEnd - p.timexh - p.timeth;
    });
    w_srt = parseFloat(wait / stt).toFixed(2);
    p_srt = parseFloat(presence / stt).toFixed(2);
  };

  const rr = (process) => {
    const quantumRR = Number(quantum);
    const process_RR = [];
    let timeCount = 0;
    let totalTime = process[0].timexh + process[0].timeth;
    process.forEach((p, i) => {
      process_RR.push({ timexh: p.timexh, timeth: p.timeth });
      if (i > 0) {
        if (p.timexh > totalTime) totalTime = p.timexh;
        totalTime += p.timeth;
      }
    });
    const remainTimeArr = [];
    const timeLandmarkArr = [];
    process_RR.forEach((p) => {
      remainTimeArr.push(p.timeth);
      timeLandmarkArr.push(p.timexh);
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
        if (remainTimeArr[stt] <= quantumRR) {
          timeCount += remainTimeArr[stt];
          process_RR[stt].timeEnd = timeCount;
          remainTimeArr[stt] = 0;
        } else {
          remainTimeArr[stt] = remainTimeArr[stt] - quantumRR;
          timeCount += quantumRR;
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
    let wait = 0;
    let presence = 0;
    process_RR.forEach((p) => {
      presence += p.timeEnd - p.timexh;
      wait += p.timeEnd - p.timexh - p.timeth;
    });

    w_rr = parseFloat(wait / stt).toFixed(2);
    p_rr = parseFloat(presence / stt).toFixed(2);
  };

  useEffect(() => {
    const process = [];
    for (let i = 0; i < stt; i++) {
      process.push({
        timexh: randomNum(txhs, txhe),
        timeth: randomNum(tths, tthe),
      });
    }
    SortProcess(process);
    fcfs(process);
    sjf(process);
    srt(process);
    rr(process);

    setData([
      {
        name: 'fcfs',
        wait: Number(w_fcfs),
        presence: Number(p_fcfs),
      },
      {
        name: 'sjf',
        wait: Number(w_sjf),
        presence: Number(p_sjf),
      },
      {
        name: 'srt',
        wait: Number(w_srt),
        presence: Number(p_srt),
      },
      {
        name: 'rr',
        wait: Number(w_rr),
        presence: Number(p_rr),
      },
    ]);
  }, []);

  return (
    <div>
      <div>
        <h1>Biểu đồ thời gian chờ trung bình,thời gian tồn tại trung bình</h1>
        <ResponsiveContainer width="100%" aspect={3}>
          <LineChart data={data} margin={{ right: 200, left: 100, top: 50 }}>
            <CartesianGrid />
            <XAxis dataKey="name" interval={'preserveStartEnd'} />
            <YAxis></YAxis>
            <Legend />
            <Tooltip />
            <Line dataKey="wait" stroke="black" activeDot={{ r: 8 }} />
            <Line dataKey="presence" stroke="red" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Auto;
