import { useEffect, useState } from "react";
import { Divider, Form, Input, Modal } from "antd";
import type { FormProps } from "antd";

interface IProps {
  openModalUpdate: boolean;
  setOpenModalUpdate: (v: boolean) => void;
  setDataUpdate: (v: IWarehouse | null) => void;
  dataUpdate: IWarehouse | null;
}

type FieldType = {
  _id: string;
  code: string;
  name: string;
};

const WarehouseUpdateModal = (props: IProps) => {
  const { openModalUpdate, setOpenModalUpdate, setDataUpdate, dataUpdate } =
    props;
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const [form] = Form.useForm();

  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        _id: dataUpdate._id,
        code: dataUpdate.code,
        name: dataUpdate.name,
      });
    }
  }, [dataUpdate]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { _id, name, code } = values;
    setIsSubmit(true);
    console.log("Update warehouse values:", _id, name, code);
    setDataUpdate(null);
    setOpenModalUpdate(false);
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
            Update Warehouse
          </div>
        }
        width="50%"
        open={openModalUpdate}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          setOpenModalUpdate(false);
          setDataUpdate(null);
          form.resetFields();
        }}
        okText={"Save"}
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
          name="form-update"
          style={{ width: "100%", marginBottom: "2.5rem" }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            hidden
            labelCol={{ span: 24 }}
            label="_id"
            name="_id"
          >
            <Input disabled />
          </Form.Item>

          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label={
              <span style={{ fontWeight: 600, fontSize: "16px" }}>Code</span>
            }
            name="code"
            rules={[{ required: true, message: "Please input code!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please input warehouse name!" },
            ]}
          >
            <Input />
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

export default WarehouseUpdateModal;
