export const jsonTemplate = {
  status: {
    code: 200,
    message: "Success",
    phraseKey: "",
  },
  body: {
    stepFlowStepsHistory: [
      {
        _id: "62239f36256b14a90d64cb18",
        status: "started",
        isActive: true,
        step: [
          {
            _id: "6223754d9cec1e9af5d77507",
            name: "intro",
            isActive: true,
          },
        ],
        createdAt: "2022-03-05T17:34:40.643Z",
        updatedAt: "2022-03-05T17:34:40.643Z",
        stepFlow: "62234dde70e5db92daa08776",
        user: "61fd47d4e9ae7a0d8eae9661",
        __v: 0,
        stepFlowStep: [
          {
            _id: "6223773de797a89bb3d7550a",
            name: "stepFlowStepA",
            isActive: true,
            stepsRenderingJson: {
              json: [
                {
                  id: "title",
                  type: "h2",
                  content: "The Gateway by Ferrum Network",
                  config: {
                    datatype: "text",
                    placeholder: "Your Name",
                  },
                  value: "",
                },
                {
                  id: "title",
                  type: "h4",
                  content:
                    "Access presales, rewards, and sustainable sustainable staking through the Crucible.",
                  config: {
                    datatype: "text",
                    placeholder: "Your Name",
                  },
                  value: "",
                },
                {
                  id: "stages",
                  type: "list",
                  title: "Mint Your Crucible Today.",
                  config: {
                    datatype: "text",
                    placeholder: "Your Name",
                  },
                  value: "",
                  items: [
                    "Mint Crucible with FRM",
                    "Mint CrucibleX with FRMx",
                    "Stake Crucible",
                    "Stake CrucibleX",
                    "Enjoy access to presales, rewards, sustainable staking",
                  ],
                },
                {
                  id: "start",
                  type: "submit",
                  content: "Get Started",
                  config: {
                    datatype: "text",
                    placeholder: "Your Name",
                  },
                  value: "",
                },
              ],
            },
            orderIndex: 0,
          },
        ],
      },
    ],
  },
};
