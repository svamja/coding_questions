package svamja.coding;

public class Runner {

	public static void main(String[] args) {
		roman();
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

}
