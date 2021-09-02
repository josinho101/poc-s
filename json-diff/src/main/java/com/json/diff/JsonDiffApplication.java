package com.json.diff;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.google.common.collect.MapDifference;
import com.google.common.collect.Maps;
import com.google.gson.Gson;

@SpringBootApplication
public class JsonDiffApplication {

	public static void main(String[] args) {
		SpringApplication.run(JsonDiffApplication.class, args);

		PrintWriter writer = null;

		try {
			String srcFilePath = args[0]; // srouce json path
			String destFilePath = args[1]; // destination json path
			String diffFilePath = args[2]; // result file path

			File sf = new File(srcFilePath);
			if (!sf.exists()) {
				System.out.println("Source json file not found!!!!");
				return;
			}

			File df = new File(destFilePath);
			if (!df.exists()) {
				System.out.println("Destination json file not found!!!!");
				return;
			}

			Map<String, Object> srcJson = readJson(srcFilePath);
			Map<String, Object> destJson = readJson(destFilePath);

			Map<String, Object> leftFlatMap = FlatMapUtil.flatten(srcJson);
			Map<String, Object> rightFlatMap = FlatMapUtil.flatten(destJson);

			MapDifference<String, Object> difference = Maps.difference(leftFlatMap, rightFlatMap);
			Map<String, Object> diff = difference.entriesOnlyOnRight();

			writer = new PrintWriter(new File(diffFilePath));
			StringBuilder sb = new StringBuilder();

			sb.append("KEY,");
			sb.append("VALUE");
			sb.append('\n');

			for (Entry<String, Object> entry : diff.entrySet()) {
				sb.append(entry.getKey() + ",");
				sb.append(entry.getValue());
				sb.append('\n');
			}

			writer.write(sb.toString());
			System.out.println("*********** DONE ***********");
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} finally {
			writer.close();
		}
	}

	@SuppressWarnings("unchecked")
	private static Map<String, Object> readJson(String path) throws FileNotFoundException {
		try {
			BufferedReader bufferedReader = new BufferedReader(new FileReader(path));
			Gson gson = new Gson();
			Map<String, Object> json = gson.fromJson(bufferedReader, HashMap.class);
			return json;
		} catch (FileNotFoundException e) {
			throw e;
		}
	}

}
