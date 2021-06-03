export default function(state,action){
    switch(action.type){
        case 'JOINED':
            return{
                ...state,
                isJoin:action.isJoin,
                userName:action.userName,
                roomId:action.roomId
            }
        default:
            return state
    }
}