package com.metrog.metrog.model;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Reply extends Timestamped {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String contents;

    @Column(nullable = false)
    private Long post_id;

    public Reply(ReplyRequestDto requestDto){
        this.contents=requestDto.getContents();
        this.name=requestDto.getName();
        this.post_id=requestDto.getPost_id();
    }
    public void update(ReplyRequestDto requestDto){
        this.name=requestDto.getName();
        this.contents=requestDto.getContents();
        this.post_id=requestDto.getPost_id();
    }
}
