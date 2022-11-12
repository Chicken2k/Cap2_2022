// import React, { useState } from 'react'
// import Axios from 'axios'
// import Messages from './Messages'
// import Card from './Card'
// import {useSelector} from 'react-redux'
// const cards = []
// fetch('http://localhost:666/tours')
//   .then(response => response.json())
//   .then(data => {
//     for (var i = 0; i < data.data.length; i++) {
//       cards.push({
//         id: data.data[i].id,
//         name: data.data[i].name,
//         avatar: data.data[i].avatar,
//         gianguoilon: data.data[i].gianguoilon,
//         vitri: data.data[i].vitri,
//         status: data.data[i].status
//       })
//     }
//   });

// const Chat = () => {
//   let user = useSelector(state=> state.infor.infor.data)
//   const [responses, setResponses] = useState([])
//   const [currentMessage, setCurrentMessage] = useState('')
//   const [check, setCheck] = useState(false)
//   const [card, setCard] = useState(cards)
//   const cardSearch = []
//   const checkSearch = false;
//   if(!user){
//     user = {
//       id: -1
//     }
//   }
//   const handleMessageSubmit = (message) => {
//     const data = {
//       message,
//       userId: user.id
//     }
//     Axios
//       .post('http://localhost:666/chatbot', data)
//       .then((response) => {
//         console.log(response.data['message'])
//         if (response.data['message'].toString().indexOf('undefined°C') !== -1) {
//           console.log("ok")
//           const responseWeather = {
//             text: "Vui lòng nhập thời tiết và địa điểm mà bạn muốn biết!",
//             isBot:true
//           }
//           setResponses((responses) => [...responses, responseWeather])
//         }
//         else if(response.data['message'].toString().includes('Thời tiết hiện tại ở'))
//         {
//           const responseWeather = {
//             text: response.data['message'],
//             isBot:true
//           }
//           setResponses((responses) => [...responses, responseWeather])
//         }
//         const responseData = {
//           text:
//             (((response.data['message']['intent']['displayName'] === "Action and Parameters") &&
//               user.id===-1)
//               && "Bạn cần đăng nhập vào hệ thống, Nếu chưa có tài khoản, bạn có thể đăng kí tài khoản trên chatbot"
//             )
//             ||
//             (response.data['message']['fulfillmentText'] !== ''
//               ? response.data['message']['fulfillmentText']
//               : "Xin lỗi, Tôi không hiểu!. Vui lòng nhập lại lần nữa ?")
//             || (response.data['message']['intent']['displayName'] === "SearchTour"
//               && response.data['message']['fulfillmentText']
//             )
//           ,
//           isBot: true,

//         }
//         if (response.data['message'].toString().includes("Thời tiết hiện tại ở")) {
//           console.log("aaa")
//         }
//         else if(response.data['message']['intent']['displayName'] === "Action and Parameters")
//         {
//           console.log("ok")
//         }
//         else {
//           setCard(cards)
//           setCheck(false)
//           for (var i = 0; i < card.length; i++) {
//             if (card[i].name.toLowerCase().indexOf(response.data['message']["queryText"].toString().toLowerCase()) !==-1) {
//               cardSearch.push({
//                 id: card[i].id,
//                 name: card[i].name,
//                 avatar: card[i].avatar,
//                 gianguoilon: card[i].gianguoilon,
//                 vitri: card[i].vitri,
//                 status: card[i].status
//               })
//               setCard(cardSearch)
//               setCheck(true)
//             }
//           }

//         }
//         if (response.data['message']['fulfillmentText'] === 'Tôi sẽ gợi ý các tour  của công ty chúng tôi hiện có') {
//           setCard(cards)
//           setCheck(false)
//           for (var i = 0; i < card.length; i++) {
//             if (card[i].status == 1) {
//               cardSearch.push({
//                 id: card[i].id,
//                 name: card[i].name,
//                 avatar: card[i].avatar,
//                 gianguoilon: card[i].gianguoilon,
//                 vitri: card[i].vitri,
//                 status: card[i].status
//               })
//               setCard(cardSearch)
//               setCheck(true)
//             }
//           }
//           console.log("checkhienco", cardSearch)
//         }
//         else if (response.data['message']['fulfillmentText'] === 'Tôi sẽ gợi ý một số tour trong nước của công ty chúng tôi') {
//           // setCheck(true)
//           setCard(cards)
//           setCheck(false)
//           for (var i = 0; i < card.length; i++) {
//             if (card[i].vitri == 1) {
//               cardSearch.push({
//                 id: card[i].id,
//                 name: card[i].name,
//                 avatar: card[i].avatar,
//                 gianguoilon: card[i].gianguoilon,
//                 vitri: card[i].vitri,
//                 status: card[i].status
//               })
//               setCard(cardSearch)
//               setCheck(true)
//             }
//           }
//           console.log("checktrongnuoc", cardSearch)
//         }
//         else if (response.data['message']['fulfillmentText'] === 'Tôi sẽ gợi ý một số tour ở nước ngoài của công ty chúng tôi') {
//           console.log("ok nuoc ngoài")
//           setCard(cards)
//           setCheck(false)
//           for (var i = 0; i < card.length; i++) {
//             if (card[i].vitri == 2) {
//               cardSearch.push({
//                 id: card[i].id,
//                 name: card[i].name,
//                 avatar: card[i].avatar,
//                 gianguoilon: card[i].gianguoilon,
//                 vitri: card[i].vitri,
//                 status: card[i].status
//               })
//               setCard(cardSearch)
//               setCheck(true)
//             }
//           }
//           console.log("checknogainuoc", cardSearch)
//         }
//         console.log(card)
//         console.log(response.data)
//         setResponses((responses) => [...responses, responseData])
//       })
//       .catch((error) => {
//         console.log('Error: ', error)
//       })
//   }
//   const handleMessageChange = (event) => {
//     setCurrentMessage(event.target.value)
//   }

//   const handleSubmit = (event) => {
//     const message = {
//       text: currentMessage,
//       isBot: false,
//     }
//     if (event.key === 'Enter' && event.target.value !== '') {
//       setResponses((responses) => [...responses, message])
//       handleMessageSubmit(message.text)
//       setCurrentMessage('')
//     }
//   }

//   return (
//     <>
//       <div className="flex justify-end px-3 mx-auto chatbot">
//         <div className="flex flex-col justify-between w-full h-auto max-w-xs py-4 my-2 bg-gray-100 shadow-sm lg:max-w-md dark:bg-gray-900 rounded-xl">
//           <div className="flex flex-col p-3 space-y-4 overflow-y-auto scrolling-touch messagesSection scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2">
//             <Messages messages={responses} />
//             {check && <Card card={card} />}
//           </div>

//           <div className="flex justify-center px-3 py-2 border-t-2 border-gray-200 dark:border-gray-600 ">
//             <div className="w-full px-2 py-2 lg:max-w-lg ">
//               <input
//                 type="text"
//                 value={currentMessage}
//                 onChange={handleMessageChange}
//                 onKeyDown={handleSubmit}
//                 placeholder="Enter your message here"
//                 className="block w-full py-2 pl-3 pr-3 text-sm enter_chatbot"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Chat
