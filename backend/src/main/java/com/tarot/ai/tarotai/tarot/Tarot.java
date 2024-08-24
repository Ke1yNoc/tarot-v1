package com.tarot.ai.tarotai.tarot;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tarot")
public class Tarot {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String tarotId;
  private String Name;
  private String positionExplanation;
}
