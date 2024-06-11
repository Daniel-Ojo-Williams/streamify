import { io, app, server } from './config/socket';
import cors from 'cors';
import userRoutes from './routes/users.routes';
import meetRoutes from './routes/meet.routes';
import type { Socket } from 'socket.io';
import { meetMessages } from './services/meets.service';

app.use(cors({
  origin: 'http://localhost:5173', credentials: true
}));

const PORT = 5000;

app.use(userRoutes);
app.use(meetRoutes);

export const meetingAndParticipants = new Map<string, {userId: string, username: string, socket: Socket}[]>();

io.on('connection', socket => {
  const userId = socket.handshake.auth.userId as string;
  const username = socket.handshake.auth.username as string;
  const meetId = socket.handshake.query.meetId as string;

  const user = {
    userId,
    username,
    socket
  }

  // --| On connect, add socket to meet with the meetId
  const participants = meetingAndParticipants.get(meetId)?.concat(user);
  participants && meetingAndParticipants.set(meetId, participants)  
  
  // --| Broadcast to all participants of the new arrival
  participants?.forEach(participant => {
    if (participant.socket.id !== socket.id) {
      // --| This is to announce that a user has joined the meet
      participant.socket.emit('new participant', username)
    }

    // --| Update the new array of participants to all users
    participant.socket.emit('participants', { userId: participant.userId, username: participant.username })
  })

  // --| Retrieve the messages that has already been sent in the meet to the new user that just joined
  meetMessages(meetId).then(messages => {
    if (messages){
      messages.messages.forEach(message => {
        socket.emit('message', message)
      })
    }
  })
})


server.listen(PORT, () => {
  console.log('Connected to server');
})