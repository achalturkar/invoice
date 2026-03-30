import React,{ useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { useAuth } from "../../../auth/AuthContext";

import {
  createStep,
  deleteFlowStep,
  getStep
} from "../../../api/leave/approvalFlowApi";

export default function ApprovalFlowSteps({flowId}) {

  const { auth } = useAuth();
  const companyId = auth?.companyId;

  const [steps,setSteps] = useState([]);

  const [form,setForm] = useState({
    levelNumber:"",
    approverType:"",
    role:"",
    userId:""
  });

  useEffect(()=>{

    if(flowId){
      loadSteps();
    }

  },[flowId]);

  const loadSteps = async()=>{

    try{

      const data = await getStep(companyId,flowId);

      setSteps(data);

    }catch(err){

      console.log(err);

    }

  };

  const handleCreateStep = async()=>{

    try{

      await createStep(companyId, flowId,form);

      setForm({
        levelNumber:"",
        approverType:"",
        role:"",
        userId:""
      });

      loadSteps();

    }catch(err){

      alert(err.message);

    }

  };

  const removeStep = async (stepId)=>{

  const confirmDelete = window.confirm("Delete this approval step?");

  if(!confirmDelete) return;

  try{

    await deleteFlowStep(companyId, flowId, stepId);

    // reload steps after delete
    loadSteps();

  }catch(err){

    console.error(err);

    alert("Failed to delete step");

  }

};


  return(

    <div className="bg-white border rounded-xl p-6">

      <h2 className="font-semibold mb-4">
        Approval Steps
      </h2>

      {/* ADD STEP */}

      <div className="grid grid-cols-5 gap-3 mb-6">

        <input
          type="number"
          placeholder="Level"
          value={form.levelNumber}
          onChange={(e)=>
            setForm({...form,levelNumber:e.target.value})
          }
          className="border p-2 rounded"
        />

        <select
          value={form.approverType}
          onChange={(e)=>
            setForm({...form,approverType:e.target.value})
          }
          className="border p-2 rounded"
        >

          <option value="">Approver Type</option>
          <option value="MANAGER">Manager</option>
          <option value="HR">HR</option>
          <option value="ROLE">Role</option>
          <option value="USER">User</option>

        </select>

        <input
          placeholder="Role"
          value={form.role}
          onChange={(e)=>
            setForm({...form,role:e.target.value})
          }
          className="border p-2 rounded"
        />

        <input
          placeholder="UserId"
          value={form.userId}
          onChange={(e)=>
            setForm({...form,userId:e.target.value})
          }
          className="border p-2 rounded"
        />

        <button
          onClick={handleCreateStep}
          className="bg-green-600 text-white flex items-center justify-center gap-1 rounded"
        >

          <Plus size={16}/>
          Add

        </button>

      </div>

      {/* STEP LIST */}

      <div className="space-y-3">

        {steps.map((step,index)=>(

          <div
            key={step.id}
            className="border p-4 rounded flex justify-between"
          >

            <div>

              <p className="font-medium">
                Level {step.levelNumber}
              </p>

              <p className="text-sm text-gray-500">
                Approver : {step.approverType}
              </p>

              {step.role && (

                <p className="text-xs">
                  Role : {step.role}
                </p>

              )}

            </div>

            <button
              onClick={()=>removeStep(step.id)}
              className="text-red-500"
            >

              <Trash2 size={16}/>

            </button>

          </div>

        ))}

      </div>

    </div>

  );

}
