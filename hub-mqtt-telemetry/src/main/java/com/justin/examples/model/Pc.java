package com.justin.examples.model;

public class Pc {
  private MemUsage memUsage;
  private String resourceId;

  public MemUsage getMemUsage() {
    return memUsage;
  }

  public String getResourceId() {
    return resourceId;
  }

  public void setMemUsage(final MemUsage memUsage) {
    this.memUsage = memUsage;
  }

  public void setResourceId(final String resourceId) {
    this.resourceId = resourceId;
  }
}
