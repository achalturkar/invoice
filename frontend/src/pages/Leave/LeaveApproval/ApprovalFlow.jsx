import React, { useEffect, useState } from "react";
import { Plus, Settings } from "lucide-react";

import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
import { useAuth } from "../../../auth/AuthContext";

import { createFlow, getflow }  from "../../../api/leave/approvalFlowApi";
import ApprovalFlowSteps from "./ApprovalFlowSteps";

export default function ApprovalFlow() {

  const { auth } = useAuth();
  const companyId = auth?.companyId;

  const [flows, setFlows] = useState([]);
  const [selectedFlow, setSelectedFlow] = useState(null);

  const [form, setForm] = useState({
    name: "",
    module: "LEAVE",
    active: true
  });

  useEffect(() => {
    loadFlows();
  }, []);

  const loadFlows = async () => {

    try {

      const data = await getflow(companyId);

      setFlows(data);

    } catch (err) {

      console.log(err);

    }

  };

  const handleCreateFlow = async () => {

    try {

      await createFlow(companyId, form);

      setForm({
        name: "",
        module: "LEAVE",
        active: true
      });

      loadFlows();

    } catch (err) {

      alert(err.message);

    }

  };

  return (

    <CompanyAdminLayout>

      <div className="max-w-6xl mx-auto  md:p-6">

        <h1 className="text-2xl font-semibold mb-6 flex gap-2 items-center">
          {/* <Settings size={20}/> */}
          Approval Flow Management
        </h1>

        {/* CREATE FLOW */}

        <div className="bg-white border rounded-xl p-6 mb-6">

          <h2 className="font-semibold mb-4">
            Create Approval Flow
          </h2>

          <div className="grid grid-cols-4 gap-4">

            <input
              type="text"
              placeholder="Flow Name"
              value={form.name}
              onChange={(e)=>
                setForm({...form,name:e.target.value})
              }
              className="border p-2 rounded"
            />

            <select
              value={form.module}
              onChange={(e)=>
                setForm({...form,module:e.target.value})
              }
              className="border p-2 rounded"
            >

              <option value="LEAVE">Leave</option>
              <option value="INVOICE">Invoice</option>
              <option value="EXPENSE">Expense</option>

            </select>

            <select
              value={form.active}
              onChange={(e)=>
                setForm({...form,active:e.target.value})
              }
              className="border p-2 rounded"
            >

              <option value={true}>Active</option>
              <option value={false}>Inactive</option>

            </select>

            <button
              onClick={handleCreateFlow}
              className="bg-indigo-600 text-white flex items-center justify-center gap-1 rounded"
            >

              <Plus size={16}/>
              Create

            </button>

          </div>

        </div>

        {/* FLOW LIST */}

        <div className="bg-white border rounded-xl p-6 mb-6">

          <h2 className="font-semibold mb-4">
            Existing Flows
          </h2>

          <div className="space-y-3">

            {flows.map((flow)=>(

              <div
                key={flow.id}
                className={`border p-4 rounded cursor-pointer
                ${selectedFlow?.id===flow.id ? "bg-indigo-50":""}`}
                onClick={()=>setSelectedFlow(flow)}
              >

                <div className="flex justify-between">

                  <div>

                    <p className="font-medium">
                      {flow.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      Module : {flow.module}
                    </p>

                  </div>

                  <span
                    className={`text-xs px-2 py-1 rounded
                    ${flow.active ? " text-green-800 font-bold"
                    :"text-gray-600"}`}
                  >

                    {flow.active ? "Active":"Inactive"}

                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* STEP MANAGER */}

        {selectedFlow && (

          <ApprovalFlowSteps
            flowId={selectedFlow.id}
          />

        )}

      </div>

    </CompanyAdminLayout>

  );

}
