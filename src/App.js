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
import Auto from './component/Auto';

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

  const [stt, setStt] = useState(0);
  const [txhs, setTxhs] = useState(0);
  const [txhe, setTxhe] = useState(0);
  const [tths, setTths] = useState(0);
  const [tthe, setTthe] = useState(0);
  const [quant, setQuant] = useState(0);

  const [validStt, setValidStt] = useState(false);
  const [validTxhs, setValidTxhs] = useState(false);
  const [validTxhe, setValidTxhe] = useState(false);
  const [validTths, setValidTths] = useState(false);
  const [validTthe, setValidTthe] = useState(false);
  const [validQuant, setValidQuant] = useState(false);

  const [auto, setAuto] = useState(false);

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
    if (fcfs) {
      return alert('Reset tiến trình để mô phỏng lại!!');
    }
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
    console.log(sjf);
    if (sjf) {
      return alert('Reset tiến trình để mô phỏng lại!!');
    }
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
    if (pri) {
      return alert('Reset tiến trình để mô phỏng lại!!');
    }
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
    if (srt) {
      return alert('Reset tiến trình để mô phỏng lại!!');
    }
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
    if (rr) {
      return alert('Reset tiến trình để mô phỏng lại!!');
    }
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

  const handleAuto = () => {
    setValidStt(false);
    setValidTxhs(false);
    setValidTxhe(false);
    setValidTths(false);
    setValidTthe(false);
    setValidQuant(false);

    if (stt <= 0) {
      setValidStt(true);
    } else {
      if (txhs < 0) {
        setValidTxhs(true);
      } else {
        if (txhe <= txhs) {
          setValidTxhe(true);
        } else {
          if (tths < 0) {
            setValidTths(true);
          } else {
            if (tthe <= tths) {
              setValidTthe(true);
            } else {
              if (quant <= 0) {
                setValidQuant(true);
              } else {
                setAuto(true);
              }
            }
          }
        }
      }
    }
  };

  const re = () => {
    setQuant(0);
    setStt(0);
    setTxhs(0);
    setTxhe(0);
    setTths(0);
    setTthe(0);
    setAuto(false);
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
      <div className="body">
        <h1 className="title">Mô phỏng với tiến trình ngẫu nhiên</h1>
        <Form>
          <FormGroup row={true}>
            <Col sm={4}>
              <Label for="stt" className="label">
                Nhập số tiến trình
              </Label>
            </Col>
            <Col sm={2}>
              <Input
                type="number"
                name="stt"
                id="stt"
                value={stt}
                onChange={(evt) => {
                  setStt(evt.target.value);
                }}
                invalid={validStt}
              />
            </Col>
          </FormGroup>
          <FormGroup row={true}>
            <Col sm={4}>
              <Label>Nhập khoảng thời gian xuất hiện</Label>
            </Col>
            <Col sm={2}>
              <Input
                type="number"
                name="txhs"
                id="txhs"
                value={txhs}
                onChange={(evt) => {
                  setTxhs(evt.target.value);
                }}
                invalid={validTxhs}
              />
            </Col>
            <Col sm={2}>
              <Label>đến</Label>
            </Col>
            <Col sm={2}>
              <Input
                type="number"
                name="txhe"
                id="txhe"
                value={txhe}
                onChange={(evt) => {
                  setTxhe(evt.target.value);
                }}
                invalid={validTxhe}
              />
            </Col>
          </FormGroup>
          <FormGroup row={true}>
            <Col sm={4}>
              <Label>Nhập khoảng thực hiện</Label>
            </Col>
            <Col sm={2}>
              <Input
                type="number"
                name="tths"
                id="tths"
                value={tths}
                onChange={(evt) => {
                  setTths(evt.target.value);
                }}
                invalid={validTths}
              />
            </Col>
            <Col sm={2}>
              <Label>đến</Label>
            </Col>
            <Col sm={2}>
              <Input
                type="number"
                name="tthe"
                id="tthe"
                value={tthe}
                onChange={(evt) => {
                  setTthe(evt.target.value);
                }}
                invalid={validTthe}
              />
            </Col>
          </FormGroup>
          <FormGroup row={true}>
            <Col sm={4}>
              <Label for="quant" className="label">
                Nhập giá trị quantum
              </Label>
            </Col>
            <Col sm={2}>
              <Input
                type="number"
                name="quant"
                id="quant"
                value={quant}
                onChange={(evt) => {
                  setQuant(evt.target.value);
                }}
                invalid={validQuant}
              />
            </Col>
          </FormGroup>
          <div className="buttons">
            <Button color="warning" onClick={handleAuto}>
              Simulate
            </Button>
            <Button color="danger" onClick={re}>
              Reset
            </Button>
          </div>
        </Form>
        {auto ? (
          <Auto
            stt={stt}
            txhs={txhs}
            txhe={txhe}
            tths={tths}
            tthe={tthe}
            quantum={quant}
          />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default App;
