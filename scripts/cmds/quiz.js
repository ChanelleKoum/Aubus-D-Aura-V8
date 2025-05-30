const fs = require("fs-extra");
const { utils } = global;

module.exports = {
	config: {
		name: "prefix",
		version: "1.3",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		shortDescription: "Thay đổi prefix của bot",
		longDescription: "Thay đổi dấu lệnh của bot trong box chat của bạn hoặc cả hệ thống bot (chỉ admin bot)",
		category: "config",
		guide: {
			vi: "   {pn} <new prefix>: thay đổi prefix mới trong box chat của bạn"
				+ "\ Ví dụ:"
				+ "\  {pn} #"
				+ "\  {pn} <new prefix> -g: thay đổi prefix mới trong hệ thống bot (chỉ admin bot)"
				+ "\ Ví dụ:"
				+ "\  {pn} # -g"
				+ "\  {pn} reset: thay đổi prefix trong box chat của bạn về mặc định",
			en: "   {pn} <new prefix>: change new prefix in your box chat"
				+ "\ Example:"
				+ "\  {pn} #"
				+ "\  {pn} <new prefix> -g: change new prefix in system bot (only admin bot)"
				+ "\ Example:"
				+ "\  {pn} # -g"
				+ "\  {pn} reset: change prefix in your box chat to default"
		}
	},

	langs: {
		vi: {
			reset: "Đã reset prefix của bạn về mặc định: %1",
			onlyAdmin: "Chỉ admin mới có thể thay đổi prefix hệ thống bot",
			confirmGlobal: "Vui lòng thả cảm xúc bất kỳ vào tin nhắn này để xác nhận thay đổi prefix của toàn bộ hệ thống bot",
			confirmThisThread: "Vui lòng thả cảm xúc bất kỳ vào tin nhắn này để xác nhận thay đổi prefix trong nhóm chat của bạn",
			successGlobal: "Đã thay đổi prefix hệ thống bot thành: %1",
			successThisThread: "Đã thay đổi prefix trong nhóm chat của bạn thành: %1",
			myPrefix: "🌐 Prefix của hệ thống: %1\ Prefix của nhóm bạn: %2"
		},
		en: {
			reset: "Your prefix has been reset to default: %1",
			onlyAdmin: "Only admin can change prefix of system bot",
			confirmGlobal: "Please react to this message to confirm change prefix of system bot",
			confirmThisThread: "Please react to this message to confirm change prefix in your box chat",
			successGlobal: "Changed prefix of system bot to: %1",
			successThisThread: "Changed prefix in your box chat to: %1",
			myPrefix: "⛷𝐒𝐡𝐮 𝐁𝐨𝐭 𝐗𝟗⛷                     ❤ 𝐒𝐲𝐬𝐭𝐞𝐦 𝐩𝐫𝐞𝐟𝐢𝐱☛ {%1}\⚜𝐘𝐨𝐮𝐫 𝐛𝐨𝐱 𝐜𝐡𝐚𝐭 𝐩𝐫𝐞𝐟𝐢𝐱☛ {%2}                        🌸𝐂𝐫𝐞𝐚𝐭𝐞𝐮𝐫 𝐝𝐮 bot☞[https://www.facebook.com/profile.php?id=100080723529878]"
		}
	},

	onStart: async function ({ message, role, args, commandName, event, threadsData, getLang }) {
		if (!args[0])
			return message.SyntaxError();

		if (args[0] == 'reset') {
			await threadsData.set(event.threadID, null, "data.prefix");
			return message.reply(getLang("reset", global.GoatBot.config.prefix));
		}

		const newPrefix = args[0];
		const formSet = {
			commandName,
			author: event.senderID,
			newPrefix
		};

		if (args[1] === "-g")
			if (role < 2)
				return message.reply(getLang("onlyAdmin"));
			else
				formSet.setGlobal = true;
		else
			formSet.setGlobal = false;

		return message.reply(args[1] === "-g" ? getLang("confirmGlobal") : getLang("confirmThisThread"), (err, info) => {
			formSet.messageID = info.messageID;
			global.GoatBot.onReaction.set(info.messageID, formSet);
		});
	},

	onReaction: async function ({ message, threadsData, event, Reaction, getLang }) {
		const { author, newPrefix, setGlobal } = Reaction;
		if (event.userID !== author)
			return;
		if (setGlobal) {
			global.GoatBot.config.prefix = newPrefix;
			fs.writeFileSync(global.client.dirConfig, JSON.stringify(global.GoatBot.config, null, 2));
			return message.reply(getLang("successGlobal", newPrefix));
		}
		else {
			await threadsData.set(event.threadID, newPrefix, "data.prefix");
			return message.reply(getLang("successThisThread", newPrefix));
		}
	},

	onChat: async function ({ event, message, getLang }) {
		if (event.body && event.body.toLowerCase() === "prefix")
			return () => {
				return message.reply(getLang("myPrefix", global.GoatBot.config.prefix, utils.getPrefix(event.threadID)));
			};
	}
};/*
quiz game solo coded by Jun Jaam
contact me: https://m.me/junzjaam

read line 242 to 278 if u want to  add your own question using json

go to line 333 and 429 to change reward

read line 39646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464646464642222222222222222222222222000000000000000000000000000000000000000000000000000 if you want to customize correct or wrong answers output

don't change credit please i know making this code is not hard as you think, but adding question is really a struggle 


konti palang sa anime at country aadd ko lang pag may free time
*/

const axios = require('axios');

module.exports = {
  config: {
    name: "quiz",
    aliases: [],
    version: "2.0",
    author: "Jun",//Shared By Loid Butter
    countDown: 10,
    role: 0,
    shortDescription: {
      vi: "",
      en: "game to earn money and enchance your iq and compete with other players"
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "games",
    guide: {
      en: "{pn} <category>\n{pn} rank\n-view your rank\n{pn} leaderboard\n-view top players\nto submit a bug report or feedback\n\n just type:\nquizr <your message>\n"
    },
    envConfig: {
      reward: 0
    }
  },
  langs: {
    en: {
      reply: "Please reply your answer with the letter only\n=========================",
      correct: "",
      wrong: ""
    }
  },
  onStart: async function ({ message, event, usersData, commandName, getLang, args, api }) {
const { getPrefix } = global.utils;
//dont remove this please this is important
const c = this.config.name;
const f = this.config.author;
const credit = "fuсkyа";
//...
  const p = getPrefix(event.threadID);
  if (args.length === 0) {
    message.reply(`Please add a category\nHere's the list of categories:\n==============\nenglish\nmath\nphysics\nfilipino\nbiology\nchemistry\nhistory\nphilosophy\nrandom\nscience\n\nanime, country\n-with pic\n\ntorf <true or false>\n-react only to answer\n==============\nExample usage: ${p}${c} english\n\n${p}${c} rank >> view your quiz rank\n${p}${c} leaderboard >> view the top players`);
    return;
  }     
  if (args[0].toLowerCase() === "rank") {
  try {
    const response = await axios.get('https://api-test.yourboss12.repl.co/api/quiz/quiz/all');
    const playerData = response.data;
    playerData.sort((a, b) => b.correct - a.correct);
    let rank = null;
    for (let i = 0; i < playerData.length; i++) {
      if (playerData[i].playerid === event.senderID) {
        rank = i + 1;
        break;
      }
    }
    if (rank) {
      const player = playerData[rank - 1];
      const userData = await usersData.get(player.playerid);
      const name = userData.name;
      let rankMessage = `🏆Rank: ${rank}\n\n`;
      rankMessage += `Name: ${name}\n`;
      rankMessage += `Correct Answers: ${player.correct}\n`;
      rankMessage += `Wrong Answers: ${player.wrong}\n`;
      rankMessage += `Total Games: ${player.correct + player.wrong}\n`;
      message.reply(rankMessage);
    } else {
      message.reply("You are not ranked yet.");
    }
    return;
  } catch (error) {
    console.log(error);
    message.reply('Failed to fetch rank data.');
    return;
  }
  }        

         
  if (args[0].toLowerCase() === "leaderboard") {
  try {
    const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Manila' });
    const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila' });

    const response = await axios.get('https://api-test.yourboss12.repl.co/api/quiz/quiz/all');
    const playerData = response.data;
    playerData.sort((a, b) => b.correct - a.correct);
    let leaderboardMessage = '│ [ 🏆 ] • Quiz Global Leaderboard \n│Quiz Started on: 7/15/2023\n│Current Date: ';
    leaderboardMessage += `${currentDate}\n`;
    leaderboardMessage += `│Current Time: ${currentTime}\n`;

    const quizStartDate = new Date("7/15/2023");
    const quizEndDate = new Date(currentDate);
    const quizDuration = Math.floor((quizEndDate - quizStartDate) / (1000 * 60 * 60 * 24)) + 1;
    leaderboardMessage += `│Quiz Running: ${quizDuration}d\n│`;
    leaderboardMessage += '=========================\n';
    let page = 1;
    let pageSize = 5;
    if (args[1] && !isNaN(args[1])) {
      page = parseInt(args[1]);
    }
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    for (let i = startIndex; i < endIndex && i < playerData.length; i++) {

      
         const player = playerData[i];
      const userData = await usersData.get(player.playerid);
      const playerName = userData.name;
      
      //this is supposed to mention player in leaderboard ☹ but got no time to fix it..
      const arraytag = [
        { id: player.playerid, tag: playerName },
        { id: player.playerid, tag: playerName }
      ];
      const msg = {
        body: `${playerName}`,
        mentions: arraytag
      };

      
      leaderboardMessage += `│Rank #${i + 1}\n│「${msg.body}」\n`;
      leaderboardMessage += `│Correct Answers: ${player.correct}\n`;
      leaderboardMessage += `│Wrong Answers: ${player.wrong}\n`;
      leaderboardMessage += `│Total Games: ${player.correct + player.wrong}\n`;
      leaderboardMessage += '╰──────────────────\n';
    }

    leaderboardMessage += `Total Players: ${playerData.length}`;
    message.reply(`${leaderboardMessage}\nType ${p}quiz leaderboard <num> to view the next page\n\nNotes: Rank is based on Correct Answers not on Total Games`);
    return;
  } catch (error) {
    console.error(error);
    message.reply('An error occurred while retrieving the leaderboard. Please try again later.');
    return;
  }
}
        
  //for true or false questions          
    if (args[0].toLowerCase() === "torf") {
      try {
        const response = await axios.get(`https://api-test.yourboss12.repl.co/apiv2/quiz?credit=${f}‎ ${credit}`);
        const data = response.data;
        const junGod = {
          commandName,
          author: event.senderID,
          question: data.question,
          fuck: data.answer === "true" ? "😆" : "😮", //change reaction here
          fvckoff: false
        };

        const info = await message.reply(`${data.question}\n\n😆: true 😮: false`);
        global.GoatBot.onReaction = new Map();
        global.GoatBot.onReaction.set(info.messageID, junGod);

        setTimeout(() => {
          api.unsendMessage(info.messageID);
          global.GoatBot.onReaction.delete(info.messageID);
        }, 20000);
      } catch (error) {
        console.log(error);
      }
    } else if (args[0].toLowerCase() === "anime") { //i can actually simplify this but let's just use this method
try {
      const response = await axios.get(`https://api-test.yourboss12.repl.co/apiv2/aniquiz?category=anime&credit=${f}‎ ${credit}`);
      const Qdata = response.data;

      if (!Qdata || !Qdata.answer) {

        return;
      }

      const text = Qdata.question;
      const link = Qdata.link;
const txt = "please reply your answer with this character's name\n====================\n\n";
      message.reply({
        body: txt + text,
        attachment: await global.utils.getStreamFromURL(link)
      }, (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName,
          messageID: info.messageID,
          author: event.senderID,
          answer: Qdata.answer
        });
        setTimeout(() => {
          message.unsend(info.messageID);
          global.GoatBot.onReply.delete(info.messageID);
        }, 30000);
      });
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
      } else if (args[0].toLowerCase() === "country") {
try {
      const response = await axios.get(`https://api-test.yourboss12.repl.co/apiv2/aniquiz?category=country&credit=${f}‎ ${credit}`);
      const Qdata = response.data;

      if (!Qdata || !Qdata.answer) {

        return;
      }

      const text = Qdata.question;
      const link = Qdata.link;
const txt = "Guess this country's name\n======================\n\n"
      message.reply({
        body: txt + text,
        attachment: await global.utils.getStreamFromURL(link)
      }, (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName,
          messageID: info.messageID,
          author: event.senderID,
          answer: Qdata.answer
        });
        setTimeout(() => {
          message.unsend(info.messageID);
          global.GoatBot.onReply.delete(info.messageID);
        }, 30000);
      });
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  } else/*if */ 
      /* modify the code if you don't want to use apis question
  
   const category = args[0] ? args[0].toLowerCase() : '';
  const fs = require('fs');

try {
  const quizData = JSON.parse(fs.readFileSync('quiz.json', 'utf8'));
  if (!quizData.length) {
    return;
  }
  const { question, answer } = quizData[0];
  const text = question.split('\n')[0];
  const choices = question.split('\n').slice(1).join('\n');
  const body = answer;
  message.reply({ body: `${getLang('reply')}\n\n${text}\n\n${choices}` }, (err, info) => {
    global.GoatBot.onReply.set(info.messageID, {
      commandName,
      messageID: info.messageID,
      author: event.senderID,
      answer,
      answered: false,
      category,
    });
    setTimeout(() => {
      const reply = global.GoatBot.onReply.get(info.messageID);
      if (!reply.answered) {
        message.unsend(info.messageID);
        global.GoatBot.onReply.delete(info.messageID);
      }
    }, 100000);
  });
} catch (error) {
  message.reply(`Sorry, there was an error getting questions for the ${category} category. Please try again later.`);
  console.log(error);
        }
        } else  */ { 
      //available category mwua
//when i add new category to api just add it here
      const category = args[0] ? args[0].toLowerCase() : '';
      //you can remove some subject here
      if (!['english','filipino', 'math', 'physics', 'chemistry', 'history', 'philosophy', 'biology', 'random', 'science'].includes(category)) {
        message.reply(`Please add a category\nHere's the list of categories:\n==============\nenglish\nmath\nphysics\nchemistry\nhistory\nphilosophy\nrandom\nfilipino\nscience\n\nanime, country\n-with pic\n\ntorf <true or false>\n-react only to answer\n==============\nExample usage: ${p}${c} english\n\n${p}${c} rank >> view your quiz rank\n${p}${c} leaderboard >> view the top players`);
    return;
      }
//api for questions
      try {
        const response = await axios.get(`https://api-test.yourboss12.repl.co/api/quiz/q?category=${category}&credit=${f}‎ ${credit}`);
        const Qdata = response.data;
        if (!Qdata.question) {
          return;
        }
        const text = Qdata.question.split('\n')[0];
        const choices = Qdata.question.split('\n').slice(1).join('\n');
        const body = Qdata.answer;
        message.reply({ body: `${getLang('reply')}\n\n${text}\n\n${choices}` }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            answer: Qdata.answer,
            answered: false,
            category,
          });
          setTimeout(() => {
            const Reply = global.GoatBot.onReply.get(info.messageID);
            if (!Reply.answered) {
              message.unsend(info.messageID);
              global.GoatBot.onReply.delete(info.messageID);
            }
          }, 100000);
        });
      } catch (error) {
        message.reply(`Sorry, there was an error getting questions for the ${category} category. Please try again later.`);
        console.log(error);
      }
}
},

  
  onReply: async function ({ message, Reply, event, api, usersData, envCommands, commandName }) {
    const { author, messageID, answer, answered, category } = Reply;

    //only the sender can asnwer it
    if (answered || author != event.senderID) {
      message.reply("⚠You are not the player of this question!");
      return;
    }

const userData = await usersData.get(event.senderID);

    const reward = 10000; //change reward here for correct answers

    const id = event.senderID;
    const name = (await usersData.get(id)).name;
    const arraytag = [
      { id: event.senderID, tag: name },
      { id: id, tag: name }
    ];

    if (formatText(event.body) == formatText(answer)) {
      global.GoatBot.onReply.delete(messageID);
      message.unsend(event.messageReply.messageID);
userData.money += reward;
      await usersData.set(event.senderID, userData);

//for storing players score for correct answer, dont edit this please

const playerid = event.senderID;
      const correctorwrong = 'correct';
      const apiUrl = `https://api-test.yourboss12.repl.co/api/quiz/quiz?playerid=${playerid}&correctorwrong=${correctorwrong}`;
      axios.get(apiUrl)
        .then(response => {
          console.log(response.data);
        })
        .catch(error =>{
          console.log(error);
        });     
    const response = await axios.get('https://api-test.yourboss12.repl.co/correct');
    const imCreditChanger = response.data;

      
      const rd = Math.floor(Math.random() * imCreditChanger.length);
      const ran = imCreditChanger[rd];

      const msg = {
        body: ran.replace('{name}', name).replace('${reward}', reward),
        mentions: arraytag
      };

 api.sendMessage(msg, event.threadID, event.messageID);
    } else {
      global.GoatBot.onReply.delete(messageID);
      message.unsend(event.messageReply.messageID);

//for storing players score for wrong answer, dont edit this please

const playerid = event.senderID;
      const correctorwrong = 'wrong';
      const apiUrl = `https://api-test.yourboss12.repl.co/api/quiz/quiz?playerid=${playerid}&correctorwrong=${correctorwrong}`;
      axios.get(apiUrl)
        .then(response => {
          console.log(response.data);
        })
        .catch(error =>{
          console.log(error);
        });    

/*
this apis purpose (made by jun jaam) is when someone make a correct answers then it will send a random congratulations message

you modify it by removing that api and replacing this

const imProChangingAuthor = JSON.parse(fs.readFileSync('correct.js', 'utf-8'));

then the correct.json will be like this
[
"congrats bro {name}, noise answer here's your reward ${reward}"
//add more
]

*/
 
const response = await axios.get('https://api-test.yourboss12.repl.co/wrong');
    const creditt = response.data;

const junn = Math.floor(Math.random() * creditt.length);
      const rn = creditt[junn];

      const msg2 = {
        body: rn.replace('{name}',name),
        mentions: arraytag
      };

      api.sendMessage(msg2, event.threadID, event.messageID);
    }          
},


  onReaction: async function ({ message, threadsData, event, Reaction, api, usersData }) {
    const { author, question, fuck, fvckoff } = Reaction;

      if (event.userID !== author || fvckoff) return;

    const userData = await usersData.get(event.userID);

   
  const reward = 10000;  /*
    const rewards = ["10000", "20000", "15000", "25000"];
const rw = Math.floor(Math.random() * rewards.length);
const reward = rewards[rw];
*/
    
    
    const id = event.userID;
    const name = (await usersData.get(id)).name;
    const arraytag = [
      { id: event.userID, tag: name },
      { id: id, tag: name }
    ];

    const fakyu = event.reaction;
    const answer = fuck;

    if (answer === fakyu) {
      userData.money += reward;
      await usersData.set(event.userID, userData);  
const playerid = event.userID;
      const correctorwrong = 'correct';
      const apiUrl = `https://api-test.yourboss12.repl.co/api/quiz/quiz?playerid=${playerid}&correctorwrong=${correctorwrong}`;
      axios.get(apiUrl)
        .then(response => {
          console.log(response.data);
        })
        .catch(error =>{
          console.log(error);
        });       
    const response = await axios.get('https://api-test.yourboss12.repl.co/correct');
    const imCreditChanger = response.data;


      const rd = Math.floor(Math.random() * imCreditChanger.length);
      const ran = imCreditChanger[rd];

      const msg = {
        body: ran.replace('{name}', name).replace('${reward}', reward),
        mentions: arraytag
      };

      api.sendMessage(msg, event.threadID, event.messageID);
    } else {
//api for player data scores
const playerid = event.userID;
      const correctorwrong = 'wrong';
      const apiUrl = `https://api-test.yourboss12.repl.co/api/quiz/quiz?playerid=${playerid}&correctorwrong=${correctorwrong}`;
      axios.get(apiUrl)
        .then(response => {
          console.log(response.data);
        })
        .catch(error =>{
          console.log(error);
        });     
      //response when wrong answr
const response = await axios.get('https://api-test.yourboss12.repl.co/wrong');
    const creditt = response.data;

const junn = Math.floor(Math.random() * creditt.length);
      const rn = creditt[junn]; 

      const msg2 = {
        body: rn.replace('{name}',name),
        mentions: arraytag
      };

      api.sendMessage(msg2, event.threadID, event.messageID);
    };
  
Reaction.fvckoff = true;
  }
};
function formatText(text) {
  return text.normalize("NFD").toLowerCase();
    }