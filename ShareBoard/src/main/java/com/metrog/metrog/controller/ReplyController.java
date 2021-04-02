package com.metrog.metrog.controller;

import com.metrog.metrog.model.Post;

import com.metrog.metrog.model.Reply;
import com.metrog.metrog.model.ReplyRequestDto;

import com.metrog.metrog.repository.ReplyRepository;

import com.metrog.metrog.service.ReplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class ReplyController {

    private final ReplyService replyService;
    private final ReplyRepository replyRepository;

    @PostMapping("/api/replys")
    public Reply createReply(@RequestBody ReplyRequestDto requestDto){
        Reply reply = new Reply(requestDto);
        return replyRepository.save(reply);
    }
    @GetMapping("/api/replys")
    public List<Reply> readReply(){
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime yesterday = LocalDateTime.now().minusDays(1);
        return replyRepository.findAllByModifiedAtBetweenOrderByModifiedAtDesc(yesterday,now);
    }
}
