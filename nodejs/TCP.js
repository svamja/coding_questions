const state_map = [
        [ "CLOSED", "APP_PASSIVE_OPEN",  "LISTEN" ],
        [ "CLOSED", "APP_ACTIVE_OPEN",  "SYN_SENT" ],
        [ "LISTEN", "RCV_SYN",  "SYN_RCVD" ],
        [ "LISTEN", "APP_SEND",  "SYN_SENT" ],
        [ "LISTEN", "APP_CLOSE",  "CLOSED" ],
        [ "SYN_RCVD", "APP_CLOSE",  "FIN_WAIT_1" ],
        [ "SYN_RCVD", "RCV_ACK",  "ESTABLISHED" ],
        [ "SYN_SENT", "RCV_SYN",  "SYN_RCVD" ],
        [ "SYN_SENT", "RCV_SYN_ACK",  "ESTABLISHED" ],
        [ "SYN_SENT", "APP_CLOSE",  "CLOSED" ],
        [ "ESTABLISHED", "APP_CLOSE",  "FIN_WAIT_1" ],
        [ "ESTABLISHED", "RCV_FIN",  "CLOSE_WAIT" ],
        [ "FIN_WAIT_1", "RCV_FIN",  "CLOSING" ],
        [ "FIN_WAIT_1", "RCV_FIN_ACK",  "TIME_WAIT" ],
        [ "FIN_WAIT_1", "RCV_ACK",  "FIN_WAIT_2" ],
        [ "CLOSING", "RCV_ACK",  "TIME_WAIT" ],
        [ "FIN_WAIT_2", "RCV_FIN",  "TIME_WAIT" ],
        [ "TIME_WAIT", "APP_TIMEOUT",  "CLOSED" ],
        [ "CLOSE_WAIT", "APP_CLOSE",  "LAST_ACK" ],
        [ "LAST_ACK", "RCV_ACK",  "CLOSED" ],
];


function traverseTCPStates(eventList){
    let state = "CLOSED";  // initial state, always
    for(let event of eventList) {
        let is_matched = false;
        for(let transition of state_map) {
            if(transition[0] == state && transition[1] == event) {
                state = transition[2];
                is_matched = true;
                break;
            }
        }
        if(!is_matched) {
            state = 'ERROR';
        }
    }
    return state;
}


const Runner = {

    run(str1, str2) {

        // AbcDE ABDE  ->  true
        // AbcDE AFDE  ->  false
        // daBcd ABC  ->  true
        // KXzQ K  ->  false
        // ABC A  ->  false
        // ABC ABCD  ->  false


        let result = abbreviation(str1, str2)
        return result;
    },

}

module.exports = Runner
   
