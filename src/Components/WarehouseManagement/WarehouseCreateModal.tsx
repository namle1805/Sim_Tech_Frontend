import { useState } from "react";
import { Divider, Form, Input, Modal } from "antd";
import type { FormProps } from "antd";

interface IProps {
  openModalCreate: boolean;
  setOpenModalCreate: (v: boolean) => void;
}

type FieldType = {
  name: string;
  code: string;
};

const WarehouseCreateModal = (props: IProps) => {
  const { openModalCreate, setOpenModalCreate } = props;
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  // https://ant.design/components/form#components-form-demo-control-hooks
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { name, code } = values;
    setIsSubmit(true);
    console.log("Create warehouse values:", name, code);
    setOpenModalCreate(false);
    setIsSubmit(false);
  };

  return (
    <>
      <Modal
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "20px",
            }}
          >
            Create Warehouse
          </div>
        }
        width="50%"
        open={openModalCreate}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          setOpenModalCreate(false);
          form.resetFields();
        }}
        okText={"Create"}
        cancelText={"Close"}
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
        <Divider
          style={{
            borderTop: "1px solid rgba(0, 0, 0, 0.8)",
          }}
        />

        <Form
          form={form}
          name="basic"
          style={{ width: "100%", marginBottom: "2.5rem" }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label={
              <span style={{ fontWeight: 600, fontSize: "16px" }}>Code</span>
            }
            name="code"
            rules={[{ required: true, message: "Please input code!" }]}
          >
            <Input placeholder="Please input code" />
          </Form.Item>

          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label={
              <span style={{ fontWeight: 600, fontSize: "16px" }}>Name</span>
            }
            name="name"
            rules={[
              { required: true, message: "Please input warehouse name!" },
            ]}
          >
            <Input placeholder="Please input warehouse name" />
          </Form.Item>
        </Form>
        <Divider
          style={{
            borderTop: "1px solid rgba(0, 0, 0, 0.8)",
          }}
        />
      </Modal>
    </>
  );
};

export default WarehouseCreateModal;
