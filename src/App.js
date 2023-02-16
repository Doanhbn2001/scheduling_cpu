import './App.css';
import {
  Form,
  Button,
  Input,
  Label,
  FormGroup,
  Col,
  FormFeedback,
  Table,
} from 'reactstrap';
import { useState } from 'react';
import FCFS from './component/FCFS';
import SJF from './component/SJF';
import Priority from './component/Priority';
import SRT from './component/SRT';
import RR from './component/RR';

function App() {
  const [name, setName] = useState('');
  const [timexh, setTimexh] = useState(0);
  const [timeth, setTimeth] = useState(0);
  const [priority, setPriority] = useState(0);
  const [quantum, setQuantum] = useState(0);

  const [validName, setValidName] = useState(false);
  const [validTimexh, setValidTimexh] = useState(false);
  const [validTimeth, setValidTimeth] = useState(false);
  const [validPriority, setValidPriority] = useState(false);
  const [validQuantum, setValidQuantum] = useState(false);

  const [process, setProcess] = useState([]);
  const [process_FCFS, setProcessFCFS] = useState([]);
  const [process_SJF, setProcessSJF] = useState([]);
  const [process_Priority, setProcessPriority] = useState([]);
  const [process_SRT, setProcessSRT] = useState([]);
  const [process_RR, setProcessRR] = useState([]);

  const [fcfs, setFCFS] = useState(false);
  const [sjf, setSJF] = useState(false);
  const [pri, setPri] = useState(false);
  const [srt, setSRT] = useState(false);
  const [rr, setRR] = useState(false);

  const handleSubmit = (evt) => {
    setValidName(false);
    setValidTimeth(false);
    setValidTimexh(false);
    setValidPriority(false);
    if (name === '') {
      setValidName(true);
    } else {
      if (timexh < 0) {
        setValidTimexh(true);
      } else {
        if (timeth < 0) {
          setValidTimeth(true);
        } else {
          const obj = {
            name: name,
            timexh: timexh,
            timeth: timeth,
            priority: priority,
          };
          setProcess((process) => [...process, obj]);
        }
      }
    }
    // evt.preventdefault();
  };

  const handleCheck = () => {
    console.log(process_SJF);
  };

  const reset = () => {
    setProcess([]);
    setFCFS(false);
    setProcessFCFS([]);
    setSJF(false);
    setProcessSJF([]);
    setPri(false);
    setProcessPriority([]);
    setSRT(false);
    setProcessSRT([]);
    setRR(false);
    setProcessRR([]);
  };

  const schedulingFCFS = () => {
    if (process.length === 0) {
      return alert('Thêm tiến trình để mô phỏng thuật toán!');
    }
    process.forEach((p) => {
      setProcessFCFS((process_FCFS) => [
        ...process_FCFS,
        {
          name: p.name,
          timexh: p.timexh,
          timeth: p.timeth,
        },
      ]);
    });

    setFCFS(true);
  };

  const schedulingSJF = () => {
    if (process.length === 0) {
      return alert('Thêm tiến trình để mô phỏng thuật toán!');
    }
    process.forEach((p) => {
      setProcessSJF((process_SJF) => [
        ...process_SJF,
        {
          name: p.name,
          timexh: p.timexh,
          timeth: p.timeth,
        },
      ]);
    });
    setSJF(true);
  };

  const schedulingPriority = () => {
    if (process.length === 0) {
      return alert('Thêm tiến trình để mô phỏng thuật toán!');
    }
    process.forEach((p) => {
      setProcessPriority((process_Priority) => [
        ...process_Priority,
        {
          name: p.name,
          timexh: p.timexh,
          timeth: p.timeth,
          priority: p.priority,
        },
      ]);
    });
    setPri(true);
  };

  const schedulingSRT = () => {
    if (process.length === 0) {
      return alert('Thêm tiến trình để mô phỏng thuật toán!');
    }
    process.forEach((p) => {
      setProcessSRT((process_SRT) => [
        ...process_SRT,
        {
          name: p.name,
          timexh: p.timexh,
          timeth: p.timeth,
          priority: p.priority,
        },
      ]);
    });
    setSRT(true);
  };

  const schedulingRR = () => {
    setValidQuantum(false);
    if (process.length === 0) {
      return alert('Thêm tiến trình để mô phỏng thuật toán!');
    }
    if (quantum <= 0) {
      return setValidQuantum(true);
    }
    process.forEach((p) => {
      setProcessRR((process_RR) => [
        ...process_RR,
        {
          name: p.name,
          timexh: p.timexh,
          timeth: p.timeth,
          priority: p.priority,
        },
      ]);
    });
    setRR(true);
  };

  return (
    <div className="App">
      <div row="true" className="body">
        <h1 className="title">Mô phỏng thuật toán lập lịch CPU</h1>
        <Col sm={3}>
          <Form>
            <FormGroup>
              <Label for="name">Tiến trình</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Nhập tên tiến trình"
                value={name}
                onChange={(evt) => {
                  setName(evt.target.value);
                }}
                invalid={validName}
              />
              <FormFeedback>Nhập tên tiến trình</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="timexh">Thời gian xuất hiện</Label>
              <Input
                type="number"
                name="timexh"
                id="timexh"
                placeholder="Nhập thời gian xuất hiện"
                value={timexh}
                onChange={(evt) => {
                  setTimexh(Number(evt.target.value));
                }}
                invalid={validTimexh}
              />
              <FormFeedback>Thời gian xuất hiện phải lớn hơn 0</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="timeth">Thời gian thực hiện</Label>
              <Input
                type="number"
                name="timeth"
                id="timeth"
                placeholder="Nhập thời gian thực hiện tiến trình"
                value={timeth}
                onChange={(evt) => {
                  setTimeth(Number(evt.target.value));
                }}
                invalid={validTimeth}
              />
              <FormFeedback>Thời gian thực hiện phải lớn hơn 0</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="priority">Độ ưu tiên (Priority)</Label>
              <Input
                type="number"
                name="priority"
                id="priority"
                placeholder=""
                value={priority}
                onChange={(evt) => {
                  setPriority(Number(evt.target.value));
                }}
                invalid={validPriority}
              />
              <FormFeedback>Độ ưu tiên phải lớn hơn 0</FormFeedback>
            </FormGroup>
            <Button color="primary" onClick={handleSubmit}>
              THÊM TIẾN TRÌNH
            </Button>
            {/* <Button color="primary" onClick={handleCheck}>
              check
            </Button> */}
          </Form>
        </Col>
        <Col sm={8} className="display-process">
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Tên tiến trình</th>
                <th>Thời gian xuất hiện</th>
                <th>Thời gian thực hiện</th>
                <th>Độ ưu tiên</th>
              </tr>
            </thead>
            <tbody>
              {process.map((p, i) => {
                return (
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{p.name}</td>
                    <td>{p.timexh}</td>
                    <td>{p.timeth}</td>
                    <td>{p.priority}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          {/* <p>{process}</p> */}
        </Col>
        <h1 className="title">Chọn thuật toán lập lịch CPU</h1>
        <div className="buttons">
          <Button color="warning" onClick={schedulingFCFS}>
            FCFS
          </Button>
          <Button color="warning" onClick={schedulingSJF}>
            SJF
          </Button>
          <Button color="warning" onClick={schedulingPriority}>
            Priority
          </Button>
          <Button color="warning" onClick={schedulingSRT}>
            SRT
          </Button>
          <Button color="warning" onClick={schedulingRR}>
            RR
          </Button>
          <Button color="danger" onClick={reset}>
            Reset
          </Button>
        </div>
        <div className="quantum">
          <Label>
            Nhập giá trị quantum để mô phỏng thuật toán Round Robin(RR)
          </Label>
          <Input
            type="number"
            name="quantum"
            id="quantum"
            placeholder="Nhập tên tiến trình"
            value={quantum}
            onChange={(evt) => {
              setQuantum(Number(evt.target.value));
            }}
            invalid={validQuantum}
          />
          <FormFeedback>Giá trị quantum phải lớn hơn 0</FormFeedback>
        </div>
        <div></div>
      </div>
      {fcfs ? <FCFS process_FCFS={process_FCFS} /> : <div></div>}
      {sjf ? <SJF process_SJF={process_SJF} /> : <div></div>}
      {pri ? <Priority process_Priority={process_Priority} /> : <div></div>}
      {srt ? <SRT process_SRT={process_SRT} /> : <div></div>}
      {rr ? <RR process_RR={process_RR} quantum={quantum} /> : <div></div>}
    </div>
  );
}

export default App;
