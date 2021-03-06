package airlinebooking.core.ws.repo;

import java.io.Serializable;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import airlinebooking.common.exception.DataAccessException;

@Repository
public class QueryRepoImpl implements QueryRepo {
	@Autowired
	CrudRepo crudRepo;
	
	@Autowired
	SelectRepo selectRepo;
	
	@Override
	@Transactional
	public <T> T create(T object) throws DataAccessException {
		return crudRepo.create(object);
	}

	@Override
	@Transactional
	public void update(Object object) throws DataAccessException {
		crudRepo.update(object);
	}

	@Override
	@Transactional
	public void delete(Object object) throws DataAccessException {
		crudRepo.delete(object);
	}

	@Override
	@Transactional
	public <T> T getEntityById(Class<T> clazz, Serializable id) throws DataAccessException {
		return selectRepo.getEntityById(clazz, id);
	}

	@Override
	@Transactional
	public <T> T getEntityByHQL(String hql, List<Object> params) throws DataAccessException {
		return selectRepo.getEntityByHQL(hql, params);
	}

	@Override
	@Transactional
	public <T> List<T> getListByHQL(String hql, List<Object> params)
			throws DataAccessException {
		return selectRepo.getListByHQL(hql, params);
	}

	@Override
	@Transactional
	public <T> List<T> getListBySQL(Class<T> clazz, String sql,
			List<Object> params) throws DataAccessException {
		return selectRepo.getListBySQL(clazz, sql, params);
	}

	@Override
	@Transactional
	public <T> List<T> getListBySQL(Class<T> clazz, String sql,
			List<Object> params, List<Class<?>> synchronizedClass,
			Integer maxResult) throws DataAccessException {
		return selectRepo.getListBySQL(clazz, sql, params, synchronizedClass, maxResult);
	}
	
	@Override
	@Transactional
	public <T> T loadEntityById(Class<T> clazz, Serializable id)  throws DataAccessException {
		return selectRepo.loadEntityById(clazz, id);
	}
}
