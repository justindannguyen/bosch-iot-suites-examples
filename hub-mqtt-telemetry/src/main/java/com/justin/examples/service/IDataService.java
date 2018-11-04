package com.justin.examples.service;

import com.justin.examples.model.MemUsage;

public interface IDataService {
  void publishMemUsage(String resourceId, MemUsage data);
}

