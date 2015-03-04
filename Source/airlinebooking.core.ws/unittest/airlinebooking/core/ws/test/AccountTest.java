package airlinebooking.core.ws.test;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import airlinebooking.core.ws.entities.Account;
import airlinebooking.core.ws.entities.Customer;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:applicationContext.xml" })
public class AccountTest {
	@Autowired
	Account acc;
	
	@Autowired
	Customer cus;
	
	@Test
	public void test(){
		try {
			acc.Show();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}