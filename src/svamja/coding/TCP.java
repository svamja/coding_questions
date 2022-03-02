package svamja.coding;

public class TCP {
	
	public static String[][] state_map = {
			{ "CLOSED", "APP_PASSIVE_OPEN",  "LISTEN" },
			{ "CLOSED", "APP_ACTIVE_OPEN",  "SYN_SENT" },
			{ "LISTEN", "RCV_SYN",  "SYN_RCVD" },
			{ "LISTEN", "APP_SEND",  "SYN_SENT" },
			{ "LISTEN", "APP_CLOSE",  "CLOSED" },
			{ "SYN_RCVD", "APP_CLOSE",  "FIN_WAIT_1" },
			{ "SYN_RCVD", "RCV_ACK",  "ESTABLISHED" },
			{ "SYN_SENT", "RCV_SYN",  "SYN_RCVD" },
			{ "SYN_SENT", "RCV_SYN_ACK",  "ESTABLISHED" },
			{ "SYN_SENT", "APP_CLOSE",  "CLOSED" },
			{ "ESTABLISHED", "APP_CLOSE",  "FIN_WAIT_1" },
			{ "ESTABLISHED", "RCV_FIN",  "CLOSE_WAIT" },
			{ "FIN_WAIT_1", "RCV_FIN",  "CLOSING" },
			{ "FIN_WAIT_1", "RCV_FIN_ACK",  "TIME_WAIT" },
			{ "FIN_WAIT_1", "RCV_ACK",  "FIN_WAIT_2" },
			{ "CLOSING", "RCV_ACK",  "TIME_WAIT" },
			{ "FIN_WAIT_2", "RCV_FIN",  "TIME_WAIT" },
			{ "TIME_WAIT", "APP_TIMEOUT",  "CLOSED" },
			{ "CLOSE_WAIT", "APP_CLOSE",  "LAST_ACK" },
			{ "LAST_ACK", "RCV_ACK",  "CLOSED" },
	};
    
    public static String traverseStates(String[] events) {
    	System.out.println("input: " + String.join(" > ", events));
        String state = "CLOSED"; // initial state, always
        for(String event: events) {
        	String next_state = "ERROR"; 
        	System.out.println("event: " + event + ". curr state: " + state);
        	for(String[] transition: state_map) {
        		System.out.println("loop: " + state + " " + event + " " + String.join(":", transition));
        		if(transition[0] == state && transition[1] == event) {
        			System.out.println("matched");
        			next_state = transition[2];
        			break;
        		}
        	}
        	state = next_state;
        	System.out.println("next state: " + next_state);
        	if(state == "ERROR") {
        		break;
        	}
        }
        return state;
    }
}

