import { useState } from "react";
import { Form, Input, Modal } from "antd";
import type { FormProps } from "antd";

interface IProps {
  openModalResponse: boolean;
  setOpenModalResponse: (v: boolean) => void;
}

type FieldType = {
  content: string;
};

const ReportResponseModal = (props: IProps) => {
  const { openModalResponse, setOpenModalResponse } = props;
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { content } = values;
    setIsSubmit(true);
    console.log("Create warehouse values:", content);
    setOpenModalResponse(false);
    setIsSubmit(false);
  };

  return (
    <>
      <Modal
        title={
          <div
            style={{
              display: "flex",
              fontWeight: 700,
              fontSize: "20px",
              marginBottom: "20px",
            }}
          >
            Response report
          </div>
        }
        width="40%"
        open={openModalResponse}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          setOpenModalResponse(false);
          form.resetFields();
        }}
        okText={"Response"}
        cancelText={"Back"}
        okButtonProps={{
          style: {
            backgroundColor: "#FF3A31",
            color: "white",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
          },
        }}
        cancelButtonProps={{
          style: {
            color: "black",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
          },
        }}
        maskClosable={false}
        confirmLoading={isSubmit}
      >
        <Form
          form={form}
          name="basic"
          style={{ width: "100%", marginBottom: "2.5rem" }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            name="content"
            rules={[
              {
                required: true,
                message: "Please input description & troubleshooting!",
              },
            ]}
          >
            <Input.TextArea
              placeholder="Please input description & troubleshooting"
              rows={6}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ReportResponseModal;
