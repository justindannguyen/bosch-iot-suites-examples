/**
 * Copyright (C) 2018, Justin Nguyen
 */
package com.justin.examples.model;

/**
 * @author tuan3.nguyen@gmail.com
 */
public class MemUsage {
  private float percentUsage;
  private long total;
  private long free;

  public long getFree() {
    return free;
  }

  public float getPercentUsage() {
    return percentUsage;
  }

  public long getTotal() {
    return total;
  }

  public void setFree(final long free) {
    this.free = free;
  }

  public void setPercentUsage(final float percentUsage) {
    this.percentUsage = percentUsage;
  }

  public void setTotal(final long total) {
    this.total = total;
  }
}
