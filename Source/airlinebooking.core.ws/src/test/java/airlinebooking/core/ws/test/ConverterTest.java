package airlinebooking.core.ws.test;

import java.io.File;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import airlinebooking.core.ws.dao.TicketParserParamDao;
import airlinebooking.core.ws.enumtype.AirlineType;
import airlinebooking.core.ws.model.TicketParserParam;
import airlinebooking.core.ws.model.helper.HtmlResultMH;
import airlinebooking.core.ws.model.helper.TicketInforMH;
import airlinebooking.core.ws.model.helper.TicketInforRawMH;
import arilinebooking.core.ws.webbot.Converter;
import arilinebooking.core.ws.webbot.ConverterVNAImpl;
import arilinebooking.core.ws.webbot.Parser;
import arilinebooking.core.ws.webbot.ParserJsoupImpl;
import arilinebooking.core.ws.webbot.TicketInforRawMaker;
import arilinebooking.core.ws.webbot.TicketInforRawMakerImpl;
import arilinebooking.core.ws.webbot.WebBot;
import arilinebooking.core.ws.webbot.WebBotVNAImpl;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring/applicationContext.xml" })
public class ConverterTest {
	@Autowired
	TicketParserParamDao ticketParserParamDao;
	
	@Test
	public void realTest() {
		try {
			List<TicketParserParam> parserPathList = ticketParserParamDao
					.getParserPathByAirlineType(AirlineType.VNAIRLINE);
			
			Calendar cal = Calendar.getInstance();
			cal.set(Calendar.YEAR, 2015);
			cal.set(Calendar.MONTH, Calendar.APRIL);
			cal.set(Calendar.DAY_OF_MONTH, 29);
			Date pickedDate = cal.getTime();

			WebBot webBotVNA = new WebBotVNAImpl();
			HtmlResultMH htmlResult = webBotVNA.getHTML("SGN", "DAD",
					pickedDate, 1, 0, 0);
			
			Parser parserJsoup = new ParserJsoupImpl();
			HashMap<String, Object> objectInforHashMap = parserJsoup.getObjectInfor(
					htmlResult, parserPathList);
			
			TicketInforRawMaker ticketInforRawMaker = new TicketInforRawMakerImpl();
			List<TicketInforRawMH> ticketInforRawMHList = ticketInforRawMaker.convertParserToTicketInforMH(objectInforHashMap);
			
			Converter converter = new ConverterVNAImpl();
			List<TicketInforMH> ticketInforMHList = converter.makeTicketInfor(ticketInforRawMHList, "SGN", "DAD", pickedDate, AirlineType.VNAIRLINE);

			System.out.println(ticketInforMHList);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@SuppressWarnings("unused")
	@Test
	public void mockTest() {
		try {
			Parser parserJsoup = new ParserJsoupImpl();

			TicketParserParam tkPP0 = new TicketParserParam();
			TicketParserParam tkPP1 = new TicketParserParam();
			TicketParserParam tkPP2 = new TicketParserParam();
			TicketParserParam tkPP3 = new TicketParserParam();
			TicketParserParam tkPP4 = new TicketParserParam();

			/* = Setup our mock object with the expected values */
			tkPP0.setAirlineType(AirlineType.VNAIRLINE);
			tkPP0.setCodeType("flight_code");
			tkPP0.setSelectorPath("a.translate[title=\"Xem chi tiết chuyến bay\"]");
			tkPP0.setTicketTypeCode("");

			tkPP1.setAirlineType(AirlineType.VNAIRLINE);
			tkPP1.setCodeType("from_time");
			tkPP1.setSelectorPath("tr.yui-dt-even > td:nth-child(3) > span.translate.wasTranslated, tr.yui-dt-odd > td:nth-child(3) > span.translate.wasTranslated");
			tkPP1.setTicketTypeCode("");

			tkPP2.setAirlineType(AirlineType.VNAIRLINE);
			tkPP2.setCodeType("to_time");
			tkPP2.setSelectorPath("tr.yui-dt-even > td:nth-child(4) > span.translate.wasTranslated, tr.yui-dt-odd > td:nth-child(4) > span.translate.wasTranslated");
			tkPP2.setTicketTypeCode("");

			tkPP3.setAirlineType(AirlineType.VNAIRLINE);
			tkPP3.setCodeType("amount");
			tkPP3.setSelectorPath("div.flight-list-section.flight-list > table > tbody > tr > td[fare-family-key=\"BF\"] span.prices-amount, div.flight-list-section.flight-list > table > tbody > tr > td[fare-family-key=\"BF\"] span.farefamily-cell-unavailable.translate.wasTranslated");
			tkPP3.setTicketTypeCode("VNA_TGLH");

			tkPP4.setAirlineType(AirlineType.VNAIRLINE);
			tkPP4.setCodeType("amount");
			tkPP4.setSelectorPath("div.flight-list-section.flight-list > table > tbody > tr > td[fare-family-key=\"BS\"] span.prices-amount, div.flight-list-section.flight-list > table > tbody > tr > td[fare-family-key=\"BS\"] span.farefamily-cell-unavailable.translate.wasTranslated");
			tkPP4.setTicketTypeCode("VNA_TGTC");

			List<TicketParserParam> parserPathList = new ArrayList<TicketParserParam>();
			parserPathList.add(tkPP0);
			parserPathList.add(tkPP1);
			parserPathList.add(tkPP2);
			parserPathList.add(tkPP3);
			parserPathList.add(tkPP4);

			File input = new File("C:/Users/nald/Desktop/united.html");
			Document doc = Jsoup.parse(input, "UTF-8");
			HtmlResultMH htmlResult = new HtmlResultMH();
			htmlResult.setHtmlResult(doc.toString());
			htmlResult.setAirlineType(AirlineType.VNAIRLINE);

			HashMap<String, Object> result = parserJsoup.getObjectInfor(
					htmlResult, parserPathList);

			TicketInforRawMaker converter = new TicketInforRawMakerImpl();
			List<TicketInforRawMH> ticketInforMHList = converter
					.convertParserToTicketInforMH(result);

			System.out.println("");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}