import React, { useState } from "react";
import "./tripsearch.css";
import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
} from "antd";
const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};


const TripSearch = () => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <>
      <div className="form-tripsearch">
        <Card>
          <div>
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={1}>Một chiều</Radio>
              <Radio value={2}>Một chục chiều</Radio>
            </Radio.Group>
          </div>
          <Form          
            layout="vertical"
          >
            <Form.Item
              label="Field A"
              required
              tooltip="This is a required field"
            >
              <Input placeholder="input placeholder" />
            </Form.Item>

            <Form.Item
              label="Field A"
              required
              tooltip="This is a required field"
            >
              <Input placeholder="input placeholder" />
            </Form.Item>

            <Form.Item
              label="Field A"
              required
              tooltip="This is a required field"
            >
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default TripSearch;
