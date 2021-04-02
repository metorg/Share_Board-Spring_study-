package com.metrog.metrog.model;


import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Post extends Timestamped{

    @GeneratedValue(strategy= GenerationType.AUTO)
    @Id
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String name;

    @Column(nullable=false)
    private String contents;

    public Post(PostRequestDto requestDto){
        this.title = requestDto.getTitle();
        this.name=requestDto.getName();
        this.contents=requestDto.getContents();
    }

    public void update(PostRequestDto requestDto){
        this.title = requestDto.getTitle();
        this.name=requestDto.getName();
        this.contents=requestDto.getContents();
    }


}
