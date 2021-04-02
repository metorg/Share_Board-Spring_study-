package com.metrog.metrog.service;

import com.metrog.metrog.model.Reply;
import com.metrog.metrog.model.ReplyRequestDto;
import com.metrog.metrog.repository.ReplyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class ReplyService {

    private final ReplyRepository replyRepository;

    @Transactional
    public Long update(Long id, ReplyRequestDto requestDto) {
        Reply reply = replyRepository.findById(id).orElseThrow(
                () -> new NullPointerException("해당 아이디가 존재하지 않습니다.")
        );
        reply.update(requestDto);
        return id;
    }

}
