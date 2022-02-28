package svamja.coding;

import java.util.LinkedHashMap;
import java.util.Map;

public class RomanNumerals {
	
	public static Map<String, Integer> alpha_map;
	public static Map<String, String> replaceMap;
	
	public static Map<String, Integer> setAlphaMap() {
		alpha_map = new LinkedHashMap<>();
	    alpha_map.put("M", 1000);
	    alpha_map.put("D", 500);
	    alpha_map.put("C", 100);
	    alpha_map.put("L", 50);
	    alpha_map.put("X", 10);
	    alpha_map.put("V", 5);
	    alpha_map.put("I", 1);
	    return alpha_map;
	}
	
	public static Map<String, String> setReplaceMap() {
		  replaceMap = new LinkedHashMap<>();
		  replaceMap.put("CM", "DCCCC");
		  replaceMap.put("CD", "CCCC");
		  replaceMap.put("XC", "LXXXX");
		  replaceMap.put("XL", "XXXX");
		  replaceMap.put("IX", "VIIII");
		  replaceMap.put("IV", "IIII");
		  return replaceMap;
	}
	 
	public static String toRoman(int n) {
		
		setAlphaMap();
		setReplaceMap();
	    
		Map<String, Integer> freq_map = new LinkedHashMap<>();
	    
	    // Build Frequencies
	    int m = n;
        for (String alpha: alpha_map.keySet()) {
        	int multiplier = alpha_map.get(alpha);
    		int freq = m / multiplier;
    		freq_map.put(alpha, freq);
    		m = m % multiplier;
        }
        
        // Build Roman String
        String roman = "";
        for(String alpha: freq_map.keySet()) {
        	int freq = freq_map.get(alpha);
        	for(int i = 0; i < freq; i++) {
        		roman += alpha;
        	}
        }
        
        // Replace Repetitions
		  for(String key: replaceMap.keySet()) {
			  String value = replaceMap.get(key);
			  roman = roman.replace(value, key);
		  }
        
        return roman;

	  }
	  
	  public static int fromRoman(String romanNumeral) {
		  setAlphaMap();
		  setReplaceMap();
		  
		  String roman = romanNumeral;
		  
		  // Replace "Minus" Combinations
		  for(String key: replaceMap.keySet()) {
			  String value = replaceMap.get(key);
			  roman = roman.replace(key, value);
		  }
		  
		  // Calculate Value
		  Integer total = 0;
		  for(int i = 0; i < roman.length(); i++) {
			  String ch = "" + roman.charAt(i);
			  Integer value = alpha_map.get(ch);
			  total += value;
		  }
		  
		  return total;
	  }

}


