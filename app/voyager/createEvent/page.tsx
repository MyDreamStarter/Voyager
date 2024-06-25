// pages/create-event.tsx
"use client";

import { Formik, Form } from "formik";
import { Input, InputNumber, DatePicker } from "antd";
import { enqueueSnackbar } from "notistack";
import Navbar from "@/app/components/reusable/HomeNavbar";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

const CreateEvent = () => {
    const router = useRouter();

    interface FormMessage {
        description: string;
        title: string;
        priceperNFT: number;
        funding_goal: number;
        proposal_type: string;
        date: any;
    }

    const initialValues: FormMessage = {
        title: "",
        description: "",
        priceperNFT: 1,
        funding_goal: 20,
        proposal_type: "",
        date: ``,
    };

    return (
        <>
            <main className="min-h-screen flex flex-col bg-blue-200">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <div className="bg-blue-200 p-10 rounded shadow-lg">
                        <Formik
                            initialValues={initialValues}
                            onSubmit={(values, actions) => {
                                const { title, description, priceperNFT, funding_goal, date } = values;
                                const queryParams = new URLSearchParams({
                                    title,
                                    description,
                                    priceperNFT: priceperNFT.toString(),
                                    funding_goal: funding_goal.toString(),
                                    date: dayjs(date).toISOString(),
                                }).toString();
                                
                                router.push(`/voyager/soloraids?${queryParams}`);
                                enqueueSnackbar(`${values.title} has been created`, {
                                    variant: "success",
                                });
                                actions.setSubmitting(false);
                            }}
                        >
                            {({ setFieldValue, values }) => (
                                <Form>
                                    <div className="text-black text-2xl mb-1 font-semibold">
                                        Create a Raid
                                    </div>
                                    <div className="text-black mb-6 italic">
                                        Submit your raid ideas for community crowdfunding
                                    </div>
                                    <div className="text-black flex flex-col gap-6">
                                        <div>
                                            <label className="font-medium" htmlFor="title">
                                                Raid Title
                                            </label>
                                            <div className="mt-2 w-[300px]">
                                                <Input
                                                    style={{ background: "#4AA5F4" }}
                                                    className="rounded-full text-white"
                                                    required
                                                    value={values.title}
                                                    onChange={(e) => {
                                                        setFieldValue("title", e.target.value);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="font-medium" htmlFor="description">
                                                Description
                                            </label>
                                            <div className="mt-2 w-[300px]">
                                                <Input.TextArea
                                                    style={{ background: "#4AA5F4" }}
                                                    className="rounded-full text-white"
                                                    required
                                                    value={values.description}
                                                    onChange={(e) => {
                                                        setFieldValue("description", e.target.value);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-8">
                                            <div>
                                                <label className="font-medium" htmlFor="priceperNFT">
                                                    Price per NFT
                                                </label>
                                                <div className="mt-2">
                                                    <InputNumber
                                                        style={{ background: "#4AA5F4" }}
                                                        className="rounded-full text-white"
                                                        required
                                                        value={values.priceperNFT}
                                                        onChange={(e) => {
                                                            setFieldValue("priceperNFT", e);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="font-medium" htmlFor="funding_goal">
                                                    Funding Goal
                                                </label>
                                                <div className="mt-2">
                                                    <InputNumber
                                                        style={{ background: "#4AA5F4" }}
                                                        className="rounded-full text-white"
                                                        required
                                                        value={values.funding_goal}
                                                        onChange={(e) => {
                                                            setFieldValue("funding_goal", e);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="date" className="block mb-2">
                                                Valid till
                                            </label>
                                            <DatePicker
                                                style={{ background: "#4AA5F4" }}
                                                className="rounded-full text-white"
                                                onChange={(e) => {
                                                    setFieldValue("date", e);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                        <button
                                            style={{ color: "white", borderRadius: '9999px', background: "#0F4C81" }}
                                            className="hover:bg-sky-500 p-4"
                                            type="submit"
                                        >
                                            Create Proposal
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </main>
        </>
    );
};

export default CreateEvent;
