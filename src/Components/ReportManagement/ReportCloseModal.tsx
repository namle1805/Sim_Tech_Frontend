import { useState } from "react";
import { Form, Modal, Select } from "antd";
import type { FormProps } from "antd";

interface IProps {
  openModalClose: boolean;
  setOpenModalClose: (v: boolean) => void;
}

type FieldType = {
  techlogCleared: string;
};

const ReportCloseModal = (props: IProps) => {
  const { openModalClose, setOpenModalClose } = props;
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { techlogCleared } = values;
    setIsSubmit(true);
    console.log("Create warehouse values:", techlogCleared);
    setOpenModalClose(false);
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
            Choose techlog cleared
          </div>
        }
        width="40%"
        open={openModalClose}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          setOpenModalClose(false);
          form.resetFields();
        }}
        okText={"Submit"}
        cancelText={"Back"}
        okButtonProps={{
          style: {
            backgroundColor: "#28A745",
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
            name="techlogCleared"
            rules={[
              { required: true, message: "Please select techlog cleared!" },
            ]}
          >
            <Select
              style={{
                height: 50,
                fontSize: 16,
              }}
              placeholder="Please select techlog cleared"
              options={[
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ReportCloseModal;
