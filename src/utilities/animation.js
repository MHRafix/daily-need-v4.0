// export default function animation() {
//   // header mini navigation animation settings here
//   const steps_navigation = [
//     {
//       style: {
//         opacity: 0,
//       },
//       duration: 200,
//     },
//     {
//       style: {
//         opacity: 1,
//         transform: "translate(0, 150px)",
//       },
//       duration: 800,
//     },
//   ];

//   // shop sidebar animation settings here
//   const steps_shop_sidebar = [
//     {
//       style: {
//         opacity: 0,
//       },
//       duration: 300,
//     },
//     {
//       style: {
//         opacity: 1,
//         transform: "translate(100px, 0)",
//       },
//       duration: 900,
//     },
//   ];

//   const appear = {
//     from: 0,
//     to: 1,
//     attributeName: "opacity",
//   };

//   const leave = {
//     steps: [
//       {
//         style: {
//           transform: "translateX(0)",
//         },
//       },
//       {
//         duration: 1000,
//         style: {
//           transform: "translateX(300)",
//           height: 50,
//         },
//       },
//       // {
//       //   duration: 2000,
//       //   style: {
//       //     height: 0,
//       //   },
//       // },
//     ],
//   };

//   return { steps_navigation, steps_shop_sidebar, appear, leave };
// }
