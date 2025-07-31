import { useState } from "react";
import { Form, Modal, Radio } from "antd";
import type { FormProps } from "antd";

interface IProps {
  openModalTypeTemplate: boolean;
  setOpenModalTypeTemplate: (v: boolean) => void;
}

type FieldType = {
  type: string;
};

const TypeTemplateModal = (props: IProps) => {
  const { openModalTypeTemplate, setOpenModalTypeTemplate } = props;
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { type } = values;
    setIsSubmit(true);
    console.log("Choose type template values:", type);
    setOpenModalTypeTemplate(false);
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
              marginBottom: "50px",
            }}
          >
            Please choose type of template
          </div>
        }
        width="50%"
        open={openModalTypeTemplate}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          setOpenModalTypeTemplate(false);
          form.resetFields();
        }}
        okText={"Submit"}
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
          style={{ width: "100%", marginBottom: "50px" }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            name="type"
            rules={[
              {
                required: true,
                message: "Please choose type of template!",
              },
            ]}
          >
            <Radio.Group defaultValue={"T1"}>
              <div className="flex flex-row justify-between items-center w-full gap-4">
                <div className="flex-1 text-center">
                  <Radio value="T1" defaultChecked>
                    <span className="text-[16px] font-semibold ">
                      Technical Log Book
                    </span>
                  </Radio>
                </div>
                <div className="flex-1 text-center">
                  <Radio value="T2">
                    <span className="text-[16px] font-semibold ">
                      Pool Trainter Handover For Training
                    </span>
                  </Radio>
                </div>
                <div className="flex-1 text-center">
                  <Radio value="T3">
                    <span className="text-[16px] font-semibold ">
                      Training Equipment Handover
                    </span>
                  </Radio>
                </div>
              </div>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TypeTemplateModal;
