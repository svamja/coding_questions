package svamja.coding;

public class Runner {

	public static void main(String[] args) {
		tcp();
	}
	
	public static void roman() {
		Integer[] inputs = { 5, 40, 99, 496, 999, 2020 };
		for(Integer input: inputs) {
			System.out.println("Input: " + input);
			String roman = RomanNumerals.toRoman(input);
			System.out.println("Roman: " + roman);
			Integer arabic = RomanNumerals.fromRoman(roman);
			System.out.println("Arabic: " + arabic);
		}
	}
	
	public static void tcp() {
//		String[] events = { "APP_PASSIVE_OPEN", "APP_SEND", "RCV_SYN_ACK" };
//		String[] events = { "APP_ACTIVE_OPEN" };
//		String[] events = { "APP_ACTIVE_OPEN", "RCV_SYN_ACK", "APP_CLOSE", "RCV_FIN_ACK", "RCV_ACK" };
		String[] events = { "APP_PASSIVE_OPEN",  "APP_SEND" };
		String end_state = TCP.traverseStates(events);
		System.out.println(end_state);
	}

}
